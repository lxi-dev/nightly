import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "nglty/server/api/trpc";

export const userRouter = createTRPCRouter({
    getUserImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Happening not found",
        });
      }



      return {image: user.image, name: user.name};
    }),

    updateProfile: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                handle: z.string().optional(),
                location: z.string().optional(),
                age: z.string().optional(),
                bio: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, handle, location, age, bio } = input;

            const updatedUser = await ctx.db.user.update({
                where: { id },
                data: {
                    handle,
                    location,
                    age,
                    bio,
                },
            });

            return updatedUser;
        }),

      checkHandleAvailability: protectedProcedure
        .input(
            z.object({
                handle: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { handle } = input;

            const existingUser = await ctx.db.user.findUnique({
                where: { handle },
            });

            // Return true if the handle is available, false otherwise
            return { isAvailable: !existingUser };
        }),

        getAllUsers: protectedProcedure.query(async ({ ctx }) => {
          const users = await ctx.db.user.findMany({
            where: {
              handle: {
                  not: null, // Only include users where handle is not null
              },
              id: {
                  not: ctx.session.user.id, // Exclude the current user's ID
              },
          },
              select: {
                  id: true,
                  name: true,
                  image: true,
                  handle: true,
                  location: true,
              },
          });
  
          return users;
      }),
});