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
});