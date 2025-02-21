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
        venue: z.string().min(1, "Venue is required"),
        color: z.string(),
        text: z.string().optional(),
        createdAt: z.preprocess(
          (val) => (typeof val === "string" ? new Date(val) : val),
          z.date()
        ),
        dateHappening: z.string().optional().refine(
          (value) => !value || !isNaN(Date.parse(value)),
          { message: "Invalid date format" }
        ),
        // inviteeIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const happening = await ctx.db.happening.create({
        data: {
          type: input.type,
          published: input.published,
          name: input.name,
          venue: input.venue,
          color: input.color,
          text: input.text,
          dateHappening: input.dateHappening ? new Date(input.dateHappening) : null,
          createdBy: {
            connect: { id: ctx.session?.user.id },
          },
          // invitees: {
          //   connect: input.inviteeIds?.map((id) => ({ id })) || [],
          // },
        },
        include: {
          createdBy: true,
          // invitees: true,
        },
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
    .input(z.object({ happeningId: z.string() }))
    .query(async ({ input, ctx }) => {
      const followers = ctx.db.happeningFollow.findMany({
        where: { happeningId: input.happeningId },
        include: { user: true },
      });

  
      return followers;
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
});