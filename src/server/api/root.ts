import { createUserRouter } from "~/server/api/routers/UserRouter";
import { createJournalRouter } from "~/server/api/routers/journalRouter";
import { createTRPCRouter } from "~/server/api/trpc";
import { getOpenAI } from "./routers/openaiRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  UserRouter: createUserRouter,
  journalRouter: createJournalRouter,
  openaiRouter: getOpenAI,
});

// export type definition of API
export type AppRouter = typeof appRouter;
