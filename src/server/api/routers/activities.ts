// src/server/routers/activity.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const activityRouter = createTRPCRouter({
  // Fetch activities by user ID
  getActivitiesByUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100).default(20), // Pagination
        cursor: z.string().optional(), // Cursor for pagination
      })
    )
    .query(async ({ input, ctx }) => {
      const { userId, limit, cursor } = input;

      const activities = await ctx.db.activity.findMany({
        where: { userId },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined = undefined;
      if (activities.length > limit) {
        const nextItem = activities.pop(); // Remove the last item for pagination
        nextCursor = nextItem?.id;
      }

      return { activities, nextCursor };
    }),

  // Fetch global feed
  getGlobalActivities: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;

      const activities = await ctx.db.activity.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined = undefined;
      if (activities.length > limit) {
        const nextItem = activities.pop();
        nextCursor = nextItem?.id;
      }

      return { activities, nextCursor };
    }),
});