import { createTRPCRouter } from "./trpc";
import { tokenRouter } from "./routers";

export const appRouter = createTRPCRouter({
	token: tokenRouter,
});

export type AppRouter = typeof appRouter;
