import { z } from "zod";

const answerRequestSchema = z.object({
	answerText: z.string().min(1, "Текст відповіді обов’язковий"),
	isCorrect: z.boolean(),
});

const editQuestionSchema = z.object({
	questionId: z.string().uuid().optional().nullable(),
	questionText: z.string().min(10, "Питання має містити щонайменше 10 символів"),
	answers: z.array(answerRequestSchema).min(3, "Має бути щонайменше 3 відповіді"),
});

export const editQuestionsSchema = z.object({
	testId: z.string().uuid(),
	questions: z.array(editQuestionSchema).min(1, "Має бути щонайменше 1 питання"),
});

export type EditQuestionsSchema = z.infer<typeof editQuestionsSchema>;