import { createTRPCRouter } from "~/server/api/trpc";
import { mailBoxRouter } from "./routers/mailbox";
import { submissionsRouter } from "./routers/getSubmitions";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    mailBoxRouter,
    submissionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
