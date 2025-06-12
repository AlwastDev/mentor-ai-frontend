import { z } from "zod";

export const AnswerDetailsResponseSchema = z.object({
	id: z.string(),
	answerText: z.string(),
});

export const QuestionDetailsResponseSchema = z.object({
	id: z.string(),
	questionText: z.string(),
	answers: z.array(AnswerDetailsResponseSchema),
});

export const GetByIdTestAttemptResponseSchema = z.object({
	id: z.string(),
	testId: z.string(),
	testName: z.string(),
	description: z.string().optional(),
	questions: z.array(QuestionDetailsResponseSchema),
});

export type GetByIdTestAttemptResponse = z.infer<typeof GetByIdTestAttemptResponseSchema>;
export type QuestionDetailsResponse = z.infer<typeof QuestionDetailsResponseSchema>;
export type AnswerDetailsResponse = z.infer<typeof AnswerDetailsResponseSchema>;
