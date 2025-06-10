import { z } from "zod";

export const editLearningMaterialSchema = z.object({
	id: z.string().uuid().optional().nullable(),
	title: z.string().max(255),
	content: z.string(),
});

export const editLearningMaterialsSchema = z.object({
	testId: z.string().uuid(),
	materials: z.array(editLearningMaterialSchema).min(1),
});

export type EditLearningMaterialsSchema = z.infer<
	typeof editLearningMaterialsSchema
>;
