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
                name: z.string(),
                id: z.string(),
                image: z.string().optional(),
                handle: z.string().optional(),
                location: z.string().optional(),
                age: z.string().optional(),
                bio: z.string().optional(),
                tos: z.boolean()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, handle, location, age, bio, name, image, tos } = input;

            const updatedUser = await ctx.db.user.update({
                where: { id },
                data: {
                    handle,
                    location,
                    age,
                    bio,
                    name,
                    image,
                    tos
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