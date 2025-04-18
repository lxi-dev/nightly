import { happeningRouter } from "nglty/server/api/routers/happening";
import { createCallerFactory, createTRPCRouter } from "nglty/server/api/trpc";
import { userRouter } from "./routers/user";
import { placesRouter } from "./routers/places";
import { scheduleRouter } from "./routers/schedules";
import { activityRouter } from "./routers/activities";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  happening: happeningRouter,
  user: userRouter,
  places: placesRouter,
  schedule: scheduleRouter,
  activity: activityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
