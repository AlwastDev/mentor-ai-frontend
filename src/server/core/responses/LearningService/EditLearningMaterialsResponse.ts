import { z } from "zod";

export const editLearningMaterialsResponseSchema = z.object({
	id: z.string().uuid(),
	testId: z.string().uuid(),
	title: z.string(),
	content: z.string(),
});

export type EditLearningMaterialsResponse = z.infer<
	typeof editLearningMaterialsResponseSchema
>;
