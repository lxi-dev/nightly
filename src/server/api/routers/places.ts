import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { logActivity } from 'nglty/server/utils/logActivity';

export const placesRouter = createTRPCRouter({
  // Create a new place
  createPlace: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        picture: z.string().url().optional(),
        description: z.string().optional(),
        geoCoordinate: z
          .object({
            latitude: z.number(),
            longitude: z.number(),
            displayName: z.string(),
          })
          .optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        zipcode: z.string().optional(),
        group: z.boolean().default(false),
        openingHours: z.record(z.string()).optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        visibility: z.enum(["public", "private", "restricted"]).default("public"),
        applicationsEnabled: z.boolean().optional()
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


      await ctx.db.place.update({
        where: { id: place.id },
        data: {
          followers: {
            connect: { id: ctx.session.user.id },
          },
        },
      });

      await logActivity({
        userId: ctx.session.user.id,
        type: "create",
        targetType: "Place",
        targetId: place.id,
        description: `${place.name} got created!`,
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
        group: z.boolean().optional(),
        creatorId: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      const places = await ctx.db.place.findMany({
        where: {
          id: input.id,
          name: input.name ? { contains: input.name, mode: 'insensitive' } : undefined,
          city: input.city,
          group: input.group,
          creatorId: input.creatorId,
          tags: input.tags ? { hasSome: input.tags } : undefined,
        },
        include: {
          followers: { select: { id: true } },
        },
      });

      return places.map((place) => ({
        ...place,
        isFollowing: place.followers.some((follower) => follower.id === userId),
      }));
    }),

  //Verify Place
  toggleVerified: publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userRole = ctx.session?.user?.role;

    if (userRole !== 'admin') {
      throw new Error('Unauthorized access');
    }

    const place = await ctx.db.place.findUnique({
      where: { id: input.id },
    });

    if (!place) {
      throw new Error('Place not found');
    }

    const updatedPlace = await ctx.db.place.update({
      where: { id: input.id },
      data: { verified: !place.verified },
      select: {
        id: true,
        verified: true,
      },
    });

    return updatedPlace;
  }),

  //Get Places Admin
  getSimplifiedPlaces: protectedProcedure
  .query(async ({ ctx }) => {
    const userRole = ctx.session?.user?.role;

    if (userRole !== 'admin') {
      throw new Error('Unauthorized access');
    }

    const places = await ctx.db.place.findMany({
      select: {
        id: true,
        name: true,
        city: true,
        group: true,
        verified: true,
        createdAt: true,
        creatorId: true,
      },
    });

    return places;
  }),

  //Get Places Admin
  getSimplePlace: protectedProcedure
  .input(z.object({
    id: z.string()
  }))
  .query(async ({ input, ctx }) => {

    const place = await ctx.db.place.findUnique({
      where: {id : input.id},
      select: {
        name: true,
        city: true,
        picture: true,
        verified: true,

      },
    });

    return place;
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
          group: z.boolean().optional(),
          openingHours: z.record(z.string()).optional(),
          category: z.string().optional(),
          tags: z.array(z.string()).optional(),
          visibility: z.enum(["public", "private", "restricted"]).optional(),
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

  // Handle applications for a place
  applyToPlace: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.placeApplication.create({
        data: {
          placeId: input.placeId,
          userId: ctx.session.user.id,
          message: input.message,
        },
      });

      await logActivity({
        userId: application.userId,
        type: "application",
        targetType: "Place",
        targetId: application.placeId,
        description: `Applied`,
      });
      return application;
    }),

  getApplications: protectedProcedure
    .input(
      z.object({
        placeId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const place = await ctx.db.place.findUnique({
        where: { id: input.placeId },
      });

      if (!place || place.creatorId !== ctx.session.user.id) {
        throw new Error('You are not authorized to view applications for this place');
      }

      const applications = await ctx.db.placeApplication.findMany({
        where: { placeId: input.placeId },
        include: { user: { select: { id: true, name: true } } },
      });

      return applications;
    }),

  respondToApplication: protectedProcedure
    .input(
      z.object({
        applicationId: z.string(),
        status: z.enum(["accepted", "declined"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.placeApplication.findUnique({
        where: { id: input.applicationId },
        include: { place: true },
      });

      if (!application || application.place.creatorId !== ctx.session.user.id) {
        throw new Error('You are not authorized to respond to this application');
      }

      await logActivity({
        userId: application.userId,
        type: "application",
        targetType: "Place",
        targetId: application.placeId,
        description: `Got ${input.status}`,
      });

      const updatedApplication = await ctx.db.placeApplication.update({
        where: { id: input.applicationId },
        data: { status: input.status },
      });

      

      return updatedApplication;
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

    await logActivity({
      userId: ctx.session.user.id,
      type: "create-post",
      targetType: "Place",
      targetId: input.placeId,
      description: `Created a new post: ${input.text}`,
    });
    return post;
  }),

  getPosts: protectedProcedure
  .input(z.object({ placeId: z.string() }))
  .query(async ({ input, ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: { placeId: input.placeId },
      orderBy: { createdAt: "asc" },
    });

    return posts;
  }),
});