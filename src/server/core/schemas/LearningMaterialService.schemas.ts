import { z } from "zod";

export const addLearningMaterialSchema = z.object({
	testId: z.string().uuid(),
	title: z.string().max(255),
	content: z.string(),
});

export type AddLearningMaterialSchema = z.infer<typeof addLearningMaterialSchema>;

export const editLearningMaterialSchema = z.object({
	id: z.string().uuid(),
	title: z.string().max(255),
	content: z.string(),
});

export type EditLearningMaterialSchema = z.infer<typeof editLearningMaterialSchema>;