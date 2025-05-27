import { createTRPCRouter } from "./trpc";
import { authRouter, learningMaterialRouter, questionRouter, testRouter } from "./routers";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	test: testRouter,
	question: questionRouter,
	learningMaterial: learningMaterialRouter,
});

export type AppRouter = typeof appRouter;
