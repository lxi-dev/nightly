import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "nglty/server/api/trpc";

// const happening = await prisma.happening.create({
//   data: {
//     type: "private",
//     published: false,
//     name: "Sample Happening",
//     venue: "Sample Venue",
//     color: "aurora-100",
//     text: "This is a sample happening.",
//     dateHappening: new Date(),
//     createdBy: {
//       connect: { id: creatorId }, // Replace with a valid User ID
//     },
//     invitees: {
//       connect: [{ id: userId1 }, { id: userId2 }], // Replace with valid User IDs
//     },
//   },
//   include: {
//     createdBy: true,
//     invitees: true,
//   },
// });

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
      createdAt: z.date(),
      dateHappening: z.string().date().optional(),
      // inviteeIds: z.array(z.string()).optional(), // Array of invitee user IDs
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

  //   getLatest: protectedProcedure.query(async ({ ctx }) => {
//     const post = {//await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     };

//     return post ?? null;
//   }),
  // Fetch all happenings created by a specific user
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
})

// export const postRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       };
//     }),

//   getLatest: protectedProcedure.query(async ({ ctx }) => {
//     const post = {//await ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     };

//     return post ?? null;
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
