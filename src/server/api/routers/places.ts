import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const placesRouter = createTRPCRouter({
  // Create a new place
  createPlace: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        picture: z.string().url(),
        description: z.string().optional(),
        geoCoordinate: z
          .object({
            latitude: z.number(),
            longitude: z.number(),
          })
          .optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        zipcode: z.string().optional(),
        heartPlace: z.boolean().default(false),
        openingHours: z.record(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { geoCoordinate, ...placeData } = input;
      const place = await ctx.db.place.create({
        data: {
          ...placeData,
          creatorId: ctx.session.user.id,
          geoCoordinate: geoCoordinate
            ? {
                create: geoCoordinate,
              }
            : undefined,
        },
      });
      return place;
    }),

  // Get places by various filters
  getPlaces: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        city: z.string().optional(),
        heartPlace: z.boolean().optional(),
        creatorId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
        const userId = ctx.session?.user?.id; // Get current user ID from session

        const places = await ctx.db.place.findMany({
          where: {
            id: input.id,
            name: input.name ? { contains: input.name, mode: 'insensitive' } : undefined,
            city: input.city,
            heartPlace: input.heartPlace,
            creatorId: input.creatorId,
          },
          include: {
            followers: { select: { id: true } }, // Include followers to determine if user follows
          },
        });
    
        return places.map((place) => ({
          ...place,
          isFollowing: place.followers.some((follower) => follower.id === userId), // Check if user follows
        }));
    }),

  // Update a place
  updatePlace: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string().optional(),
          picture: z.string().url().optional(),
          description: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          zipcode: z.string().optional(),
          heartPlace: z.boolean().optional(),
          openingHours: z.record(z.string()).optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const place = await ctx.db.place.update({
        where: { id: input.id },
        data: input.data,
      });
      return place;
    }),

  // Delete a place
  deletePlace: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.place.delete({ where: { id: input } });
      return { success: true };
    }),

  // Follow a place
  followPlace: protectedProcedure
    .input(z.object({ placeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const follow = await ctx.db.place.update({
        where: { id: input.placeId },
        data: {
          followers: {
            connect: { id: ctx.session.user.id },
          },
        },
      });
      return follow;
    }),

  // Post as the owner of a place
  postAsOwner: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const place = await ctx.db.place.findUnique({
        where: { id: input.placeId },
      });

      if (!place || place.creatorId !== ctx.session.user.id) {
        throw new Error('You are not the owner of this place');
      }

      const post = await ctx.db.post.create({
        data: {
          text: input.text,
          placeId: input.placeId,
          creatorId: ctx.session.user.id,
        },
      });
      return post;
    }),
});
