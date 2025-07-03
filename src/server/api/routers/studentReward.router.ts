import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IStudentRewardService } from "@/server/core/services/interfaces/IStudentRewardService";

const studentRewardService = container.get<IStudentRewardService>(
	SYMBOLS.IStudentRewardService,
);

export const studentRewardRouter = createTRPCRouter({
	getHistory: protectedProcedure.query(async ({ ctx }) =>
		studentRewardService.getHistory(ctx.access_token!),
	),
}); 