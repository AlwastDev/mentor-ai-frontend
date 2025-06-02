import { z } from "zod";

export const learningMaterialSchema = z.object({
  id: z.string().uuid(),
  testId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
});

export const editLearningMaterialsResponseSchema = z.object({
  materials: z.array(learningMaterialSchema),
});

export type LearningMaterial = z.infer<typeof learningMaterialSchema>;
export type EditLearningMaterialsResponse = z.infer<typeof editLearningMaterialsResponseSchema>;