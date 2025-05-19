import { z } from "zod";

const answerRequestSchema = z.object({
	answerText: z.string().min(1, "Текст відповіді обов’язковий"),
	isCorrect: z.boolean(),
});

export const createQuestionSchema = z.object({
	testId: z.string().uuid(),
	questionText: z.string().min(10, "Питання має містити щонайменше 10 символів"),
	answers: z.array(answerRequestSchema).min(3, "Має бути щонайменше 3 відповіді"),
});

export type CreateQuestionSchema = z.infer<typeof createQuestionSchema>;

export const editQuestionSchema = z.object({
	questionId: z.string().uuid(),
	questionText: z.string().min(10, "Питання має містити щонайменше 10 символів"),
	answers: z.array(answerRequestSchema).min(3, "Має бути щонайменше 3 відповіді"),
});

export type EditQuestionSchema = z.infer<typeof editQuestionSchema>;
