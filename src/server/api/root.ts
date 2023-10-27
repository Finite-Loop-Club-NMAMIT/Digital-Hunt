import { createTRPCRouter } from "~/server/api/trpc";
import { mailBoxRouter } from "./routers/mailbox";
import { admin } from "./routers/admin";
import { round1Router } from "./routers/round1";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    mailBoxRouter,
    admin,
    round1:round1Router
});

// export type definition of API
export type AppRouter = typeof appRouter;
