import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IQuestionService } from "@/server/core/services/interfaces/IQuestionService";
import { createQuestionSchema, editQuestionSchema } from "@/server/core/schemas/QuestionService.schemas";

const questionService = container.get<IQuestionService>(SYMBOLS.IQuestionService);

export const questionRouter = createTRPCRouter({
	create: adminProcedure
		.input(createQuestionSchema)
		.mutation(async ({ input, ctx }) =>
			questionService.createQuestion({ ...input }, ctx.session?.accessToken),
		),

	edit: adminProcedure
		.input(editQuestionSchema)
		.mutation(async ({ input, ctx }) =>
			questionService.editQuestion({ ...input }, ctx.session?.accessToken),
		),

	delete: adminProcedure
		.input(z.string().uuid())
		.mutation(async ({ input, ctx }) => questionService.deleteQuestion(input, ctx.session?.accessToken)),
});
