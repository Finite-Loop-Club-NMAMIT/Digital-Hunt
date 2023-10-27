import { createTRPCRouter } from "~/server/api/trpc";
import { mailBoxRouter } from "./routers/mailbox";
import { admin } from "./routers/admin";
import { files } from "./routers/resources";
import { round1Router } from "./routers/round1";
import { round2Router } from "./routers/round2";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    mailBoxRouter,
    admin,
	files,
    round1:round1Router,
    round2:round2Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
