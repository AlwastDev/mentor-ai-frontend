import { createTRPCRouter } from "./trpc";
import {
	authRouter,
	learningMaterialRouter,
	questionRouter,
	subscriptionRouter,
	testRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	test: testRouter,
	question: questionRouter,
	learningMaterial: learningMaterialRouter,
	subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;
