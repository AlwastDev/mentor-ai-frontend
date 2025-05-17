import { createTRPCRouter } from "./trpc";
import { testRouter } from "./routers";

export const appRouter = createTRPCRouter({
	test: testRouter,
});

export type AppRouter = typeof appRouter;
