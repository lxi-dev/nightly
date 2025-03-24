import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "nglty/server/api/trpc";

export const happeningRouter = createTRPCRouter({
  createHappening: publicProcedure
    .input(
        z.object({
            type: z.enum(["private", "placebound", "public"]),
            published: z.boolean(),
            name: z.string().min(1, "Name is required"),
            venue: z.string().optional(),
            venueId: z.string().optional(),
            color: z.string(),
            text: z.string().optional(),
            createdAt: z.preprocess(
                (val) => (typeof val === "string" ? new Date(val) : val),
                z.date()
            ),
            updatedAt: z.preprocess(
                (val) => (typeof val === "string" ? new Date(val) : val),
                z.date()
            ),
            dateHappening: z.string().optional().refine(
                (value) => !value || !isNaN(Date.parse(value)),
                { message: "Invalid date format" }
            ),
            postsEnabled: z.boolean().optional().default(true),
            helpingHandsEnabled: z.boolean().optional().default(false),
            maxParticipants: z.number().int().optional(),
            tags: z.array(z.string()).optional(),
            coverImageUrl: z.string().url().optional(),
            externalLinks: z.array(z.string().url()).optional(),
            isRecurring: z.boolean().optional().default(false),
            recurrencePattern: z.string().optional(),
            privacyLevel: z.enum(["open", "invite-only", "rsvp-required"]),
            cancellationReason: z.string().optional(),
            archived: z.boolean().optional().default(false)
        })
    )
    .mutation(async ({ input, ctx }) => {
        const happening = await ctx.db.happening.create({
            data: {
                ...input,
                dateHappening: input.dateHappening ? new Date(input.dateHappening) : null,
                createdBy: {
                  connect: { id: ctx.session?.user.id },
                },
            }
        });
        return happening;
    }),
  

  getHappeningsByUser: protectedProcedure.query(async ({ ctx }) => {
    const happenings = await ctx.db.happening.findMany({
      where: {
        creatorId: ctx.session.user.id,
      },
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: true,
      },
    });

    return happenings;
  }),

  getAllPublic: protectedProcedure.query(async ({ ctx }) => {
    const happenings = await ctx.db.happening.findMany({
      where: {
        type: 'public',
        createdBy: {
          id: { not: ctx.session.user.id }, // Exclude happenings created by the specific user ID
        },
      },
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: true,
      },
    });

    return happenings;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const happening = await ctx.db.happening.findUnique({
        where: { id: input.id },
        include: {
          createdBy: true,
        },
      });

      if (!happening) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Happening not found",
        });
      }

      return happening;
    }),

  createPost: protectedProcedure
  .input(
    z.object({
      happeningId: z.string(),
      text: z.string().min(1, "Post text is required"),
      creatorId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const post = await ctx.db.post.create({
      data: {
        text: input.text,
        happeningId: input.happeningId,
        creatorId: input.creatorId,
      },
    });

    return post;
  }),

  follow: protectedProcedure
  .input(
    z.object({
      status: z.string(),
      userId: z.string(),
      happeningId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const follow = await ctx.db.happeningFollow.create({
      data: {
        status: input.status,
        userId: input.userId,
        happeningId: input.happeningId,
      },
    });

    return follow;
  }),
  updateFollow: protectedProcedure
  .input(
    z.object({
      status: z.string(),
      userId: z.string(),
      happeningId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const followUpdate = await ctx.db.happeningFollow.update({
      where: {
        userId_happeningId: { userId: input.userId, happeningId: input.happeningId },
      },
      data: {
        status: input.status,
      },
    });

    return followUpdate;
  }),
  
  getFollowing: protectedProcedure
  .input(
    z.object({
      happeningId: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { happeningId } = input;
    const userId = ctx.session.user.id; // Assuming user session is available

    // Fetch followers and their statuses
    const followers = await ctx.db.happeningFollow.findMany({
      where: { happeningId },
      select: {
        status: true,
        userId: true,
      },
    });

    // Calculate counts
    const totalFollowers = followers.length;
    const pendingCount = followers.filter((f) => f.status === "tentative").length;
    const isFollowing = followers.some((f) => f.userId === userId);

    return {
      followers: totalFollowers,
      pending: pendingCount,
      isFollowing,
    };
  }),


  getPostsByHappening: protectedProcedure
  .input(z.object({ happeningId: z.string() }))
  .query(async ({ input, ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: { happeningId: input.happeningId },
      orderBy: { createdAt: "asc" },
    });

    return posts;
  }),

  getByCreatorId: protectedProcedure
  .input(z.object({ creatorId: z.string() }))
  .query(async ({ input, ctx }) => {
    const happenings = await ctx.db.happening.findMany({
      where: { creatorId: input.creatorId },
      include: {
        createdBy: true,
      },
    });

    return happenings;
  }),

getByVenue: protectedProcedure
  .input(z.object({ venue: z.string() }))
  .query(async ({ input, ctx }) => {
    const happenings = await ctx.db.happening.findMany({
      where: { venueId: input.venue },
    });

    return happenings;
  }),

  getByDate: protectedProcedure
  .input(z.object({ range: z.enum(["7_days", "1_month"]) }))
  .query(async ({ input, ctx }) => {
    const today = new Date();
    let futureDate;

    if (input.range === "7_days") {
      futureDate = new Date();
      futureDate.setDate(today.getDate() + 7);
    } else if (input.range === "1_month") {
      futureDate = new Date();
      futureDate.setMonth(today.getMonth() + 1);
    }

    const happenings = await ctx.db.happening.findMany({
      where: {
        dateHappening: {
          gte: today,
          lte: futureDate,
        },
      },
      include: {
        createdBy: true,
      },
    });

    return happenings;
  }),

  // Delete a place
  deleteHappening: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.happening.delete({ where: { id: input } });
      return { success: true };
    }),


getByType: protectedProcedure
  .input(z.object({ type: z.string() }))
  .query(async ({ input, ctx }) => {
    const happenings = await ctx.db.happening.findMany({
      where: { type: input.type },
      include: {
        createdBy: true,
      },
    });

    return happenings;
  }),

search: protectedProcedure
  .input(
    z.object({
      creatorId: z.string().optional(),
      venue: z.string().optional(),
      date: z.date().optional(),
      type: z.string().optional(),
    })
  )
  .query(async ({ input, ctx }) => {
    const happenings = await ctx.db.happening.findMany({
      where: {
        creatorId: input.creatorId,
        venue: input.venue,
        dateHappening: input.date,
        type: input.type,
      },
      include: {
        createdBy: true,
      },
    });

    return happenings;
  }),

  getFollowedHappenings: protectedProcedure
  .query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const followedHappenings = await ctx.db.happeningFollow.findMany({
      where: { userId },
      include: {
        happening: {
          include: {
            createdBy: false, // Include creator details if needed
          },
        },
      },
    });

    // Extract the happenings from the result
    return followedHappenings.map((follow) => follow.happening);
  }),
});