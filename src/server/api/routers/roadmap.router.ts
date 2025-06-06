import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IRoadmapService } from "@/server/core/services/interfaces/IRoadmapService";

const roadmapService = container.get<IRoadmapService>(SYMBOLS.IRoadmapService);

export const roadmapRouter = createTRPCRouter({
	get: protectedProcedure.query(async ({ ctx }) => roadmapService.get(ctx.access_token!)),

	generate: protectedProcedure.mutation(async ({ ctx }) =>
		roadmapService.generate(ctx.access_token!),
	),
});
