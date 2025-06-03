import { createTRPCRouter } from "./trpc";
import {
	learningMaterialRouter,
	questionRouter,
	studentSubscriptionRouter,
	subscriptionRouter,
	testRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
	test: testRouter,
	question: questionRouter,
	learningMaterial: learningMaterialRouter,
	subscription: subscriptionRouter,
	studentSubscription: studentSubscriptionRouter,
});

export type AppRouter = typeof appRouter;
