import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ILeaderboardService } from "@/server/core/services/interfaces/ILeaderboardService";

const leaderboardService = container.get<ILeaderboardService>(
	SYMBOLS.ILeaderboardService,
);

export const leaderboardRouter = createTRPCRouter({
	getTop: protectedProcedure
		.query(async ({ ctx }) =>
			leaderboardService.getTop(ctx.access_token!),
		),
});
