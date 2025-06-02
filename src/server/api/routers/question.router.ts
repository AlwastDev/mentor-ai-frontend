import { adminProcedure, createTRPCRouter } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IQuestionService } from "@/server/core/services/interfaces/IQuestionService";
import { editQuestionsSchema } from "@/server/core/schemas/QuestionService/editQuestion.schema";

const questionService = container.get<IQuestionService>(SYMBOLS.IQuestionService);

export const questionRouter = createTRPCRouter({
	edit: adminProcedure
		.input(editQuestionsSchema)
		.mutation(async ({ input, ctx }) =>
			questionService.editQuestion({ ...input }, ctx.access_token),
		),
});
