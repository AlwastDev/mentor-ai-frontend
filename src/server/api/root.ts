import { createTRPCRouter } from "./trpc";
import { learningMaterialRouter, questionRouter, testRouter } from "./routers";

export const appRouter = createTRPCRouter({
	test: testRouter,
	question: questionRouter,
	learningMaterial: learningMaterialRouter,
});

export type AppRouter = typeof appRouter;
