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

    getUserProfile: protectedProcedure
        .input(z.object({id : z.string().optional() }))
        .query(async ({ input, ctx }) => {
            let profile;
            if (!input.id) {
                const userId = ctx.session.user.id
                profile = await ctx.db.user.findUnique({
                    where: {id: userId},
                    include: { geoCoordinate: true },
                });
            } else {
                profile = await ctx.db.user.findUnique({
                    where: { id: input.id },
                });
            }
            if (!profile) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                });
            }
            return {profile};
        }),
        getMyProfile: protectedProcedure
        .query(async ({ ctx }) => {
                const userId = ctx.session.user.id
                const profile = await ctx.db.user.findUnique({
                    where: {id: userId},
                    include: { geoCoordinate: true },
                });
            if (!profile) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                });
            }
            return {profile};
        }),

    updateProfile: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                id: z.string(),
                image: z.string().optional(),
                handle: z.string().optional(),
                location: z.string().optional(),
                geoCoordinates: z.object({
                    latitude: z.string(),
                    longitude: z.string(),
                    displayName: z.string()
                }).optional(),
                age: z.string().optional(),
                bio: z.string().optional(),
                tos: z.boolean()
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, handle, location, age, bio, name, image, tos, geoCoordinates } = input;

            const geoCoordinateData = geoCoordinates
            ? {
                  upsert: {
                      create: {
                          latitude: +geoCoordinates.latitude,
                          longitude: +geoCoordinates.longitude,
                          displayName: geoCoordinates.displayName,
                      },
                      update: {
                          latitude: +geoCoordinates.latitude,
                          longitude: +geoCoordinates.longitude,
                          displayName: geoCoordinates.displayName,
                      },
                  },
              }
            : undefined;
              
        const updatedUser = await ctx.db.user.update({
            where: { id },
            data: {
                handle,
                location,
                age,
                bio,
                name,
                image,
                tos,
                geoCoordinate: geoCoordinateData,
            },
        });
        console.log(updatedUser);
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
      // Admin route to delete a user
    deleteUserAsAdmin: protectedProcedure
.input(z.object({ id: z.string() }))
.mutation(async ({ input, ctx }) => {
  const isAdmin = ctx.session?.user?.role === "admin"; // Assuming role-based access control

  if (!isAdmin) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have permission to perform this action.",
    });
  }

  const user = await ctx.db.user.findUnique({
    where: { id: input.id },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found.",
    });
  }

  await ctx.db.user.delete({
    where: { id: input.id },
  });

  return { message: "User successfully deleted." };
}),

// User route to delete their own account
deleteOwnUser: protectedProcedure
.mutation(async ({ ctx }) => {
  const userId = ctx.session?.user?.id; // Assuming session contains user info

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to delete your account.",
    });
  }

  const user = await ctx.db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found.",
    });
  }

  await ctx.db.user.delete({
    where: { id: userId },
  });

  return { message: "Your account has been successfully deleted." };
})
});