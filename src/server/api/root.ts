import { createTRPCRouter } from "./trpc";
import {
	learningMaterialRouter,
	questionRouter,
	roadmapRouter,
	studentSubscriptionRouter,
	subscriptionRouter,
	testRouter,
	testAttemptRouter,
	leaderboardRouter,
	studentRewardRouter,
} from "./routers";

export const appRouter = createTRPCRouter({
	test: testRouter,
	question: questionRouter,
	learningMaterial: learningMaterialRouter,
	subscription: subscriptionRouter,
	studentSubscription: studentSubscriptionRouter,
	roadmap: roadmapRouter,
	testAttempt: testAttemptRouter,
	leaderboard: leaderboardRouter,
	studentReward: studentRewardRouter,
});

export type AppRouter = typeof appRouter;
