import { z } from "zod";

export const AnswerDetailsResponseSchema = z.object({
	id: z.string().optional(),
	answerText: z.string().min(1, "Відповідь не може бути порожньою"),
	isCorrect: z.boolean(),
});

export const QuestionDetailsResponseSchema = z.object({
	id: z.string().optional(),
	questionText: z.string().min(1, "Питання не може бути порожнім"),
	answers: z.array(AnswerDetailsResponseSchema),
});

export const LearningMaterialResponseSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, "Назва матеріалу не може бути порожньою"),
	content: z.string().min(1, "Контент матеріалу не може бути порожнім"),
});

export const GetByIdResponseSchema = z.object({
	id: z.string().optional(),
	testName: z.string().min(1, "Назва тесту не може бути порожньою"),
	description: z.string().optional(),
	questions: z.array(QuestionDetailsResponseSchema),
	materials: z.array(LearningMaterialResponseSchema),
});

export type GetByIdResponse = z.infer<typeof GetByIdResponseSchema>;
export type QuestionDetailsResponse = z.infer<typeof QuestionDetailsResponseSchema>;
export type AnswerDetailsResponse = z.infer<typeof AnswerDetailsResponseSchema>;
export type LearningMaterialResponse = z.infer<typeof LearningMaterialResponseSchema>;
