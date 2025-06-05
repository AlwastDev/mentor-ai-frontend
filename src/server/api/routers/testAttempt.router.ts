import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ITestAttemptService } from "@/server/core/services/interfaces/ITestAttemptService";
import { startTestAttemptSchema } from "@/server/core/schemas/TestAttemptService/startTestAttempt.schema";
import { completeTestAttemptSchema } from "@/server/core/schemas/TestAttemptService/completeTestAttempt.schema";

const testAttemptService = container.get<ITestAttemptService>(SYMBOLS.ITestAttemptService);

export const testAttemptRouter = createTRPCRouter({
	getById: protectedProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input, ctx }) => testAttemptService.getTestAttemptById(input.id, ctx.access_token!)),

	start: protectedProcedure
		.input(startTestAttemptSchema)
		.mutation(async ({ input, ctx }) => testAttemptService.start({ ...input }, ctx.access_token!)),

	complete: protectedProcedure
		.input(completeTestAttemptSchema)
		.mutation(async ({ input, ctx }) =>
			testAttemptService.complete({ ...input }, ctx.access_token!),
		),
});
