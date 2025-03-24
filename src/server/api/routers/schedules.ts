import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

// Zod schemas for validation
const timeSlotSchema = z.object({
  id: z.string().optional(),
  start: z.string(),
  end: z.string(),
  startDay: z.number(),
  endDay: z.number(),
  isOvernight: z.boolean().optional(),
});

const positionSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  timeSlots: z.array(timeSlotSchema),
});

const scheduleDataSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  positions: z.array(positionSchema),
});

export const scheduleRouter = createTRPCRouter({
  // Create a new schedule
  create: protectedProcedure
    .input(
      z.object({
        happeningId: z.string(),
        name: z.string(),
        scheduleData: scheduleDataSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Create the schedule
        const schedule = await ctx.db.schedule.create({
          data: {
            name: input.name,
            startTime: input.scheduleData.startTime,
            endTime: input.scheduleData.endTime,
            happening: {
              connect: {
                id: input.happeningId,
              },
            },
            positions: {
              create: input.scheduleData.positions.map((position) => ({
                name: position.name,
                timeSlots: {
                  create: position.timeSlots.map((slot) => ({
                    start: slot.start,
                    end: slot.end,
                    startDay: slot.startDay,
                    endDay: slot.endDay,
                  })),
                },
              })),
            },
          },
        });

        return schedule;
      } catch (error) {
        console.error("Error creating schedule:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create schedule",
        });
      }
    }),

  // Get a schedule by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const schedule = await ctx.db.schedule.findUnique({
          where: { id: input.id },
          include: {
            positions: {
              include: {
                timeSlots: true,
              },
            },
          },
        });

        if (!schedule) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Schedule not found",
          });
        }

        // Convert from database model to application model
        return {
          id: schedule.id,
          name: schedule.name,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
          happeningId: schedule.happeningId,
          scheduleData: {
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            positions: schedule.positions.map((position) => ({
              id: position.id,
              name: position.name,
              timeSlots: position.timeSlots.map((slot) => ({
                id: slot.id,
                start: slot.start,
                end: slot.end,
                startDay: slot.startDay,
                endDay: slot.endDay,
                isOvernight: slot.startDay !== slot.endDay,
              })),
            })),
          },
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        
        console.error("Error getting schedule:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get schedule",
        });
      }
    }),

  // Get all schedules for a happening
  getByHappeningId: protectedProcedure
    .input(z.object({ happeningId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const schedules = await ctx.db.schedule.findMany({
          where: { happeningId: input.happeningId },
          orderBy: { createdAt: "desc" },
        });

        return schedules;
      } catch (error) {
        console.error("Error getting schedules:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get schedules",
        });
      }
    }),

  // Update an existing schedule
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        scheduleData: scheduleDataSchema.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // First check if the schedule exists
        const existingSchedule = await ctx.db.schedule.findUnique({
          where: { id: input.id },
          include: {
            positions: {
              include: {
                timeSlots: true,
              },
            },
          },
        });

        if (!existingSchedule) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Schedule not found",
          });
        }

        // If we're updating the schedule data, we need to delete all existing positions and time slots
        // and recreate them to avoid complex diffing logic
        if (input.scheduleData) {
          // Delete all existing positions (cascades to time slots)
          await ctx.db.position.deleteMany({
            where: { scheduleId: input.id },
          });

          // Update the schedule with new data
          const updatedSchedule = await ctx.db.schedule.update({
            where: { id: input.id },
            data: {
              name: input.name,
              startTime: input.scheduleData.startTime,
              endTime: input.scheduleData.endTime,
              positions: {
                create: input.scheduleData.positions.map((position) => ({
                  name: position.name,
                  timeSlots: {
                    create: position.timeSlots.map((slot) => ({
                      start: slot.start,
                      end: slot.end,
                      startDay: slot.startDay,
                      endDay: slot.endDay,
                    })),
                  },
                })),
              },
            },
            include: {
              positions: {
                include: {
                  timeSlots: true,
                },
              },
            },
          });

          return updatedSchedule;
        } else if (input.name) {
          // If we're just updating the name, it's simpler
          const updatedSchedule = await ctx.db.schedule.update({
            where: { id: input.id },
            data: {
              name: input.name,
            },
          });

          return updatedSchedule;
        }

        return existingSchedule;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        
        console.error("Error updating schedule:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update schedule",
        });
      }
    }),

  // Delete a schedule
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.schedule.delete({
          where: { id: input.id },
        });

        return { success: true };
      } catch (error) {
        console.error("Error deleting schedule:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete schedule",
        });
      }
    }),
});