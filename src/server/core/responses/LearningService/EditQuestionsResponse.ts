import { z } from "zod";

export const answerDetailsResponseSchema = z.object({
	id: z.string().uuid(),
	answerText: z.string(),
	isCorrect: z.boolean(),
});

export const questionDetailsResponseSchema = z.object({
	id: z.string().uuid(),
	questionText: z.string(),
	answers: z.array(answerDetailsResponseSchema),
});

export const editQuestionsResponseSchema = z.object({
	questions: z.array(questionDetailsResponseSchema),
});

export type AnswerDetailsResponse = z.infer<typeof answerDetailsResponseSchema>;
export type QuestionDetailsResponse = z.infer<
	typeof questionDetailsResponseSchema
>;
export type EditQuestionsResponse = z.infer<typeof editQuestionsResponseSchema>;
