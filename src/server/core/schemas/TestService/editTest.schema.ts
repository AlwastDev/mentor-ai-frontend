import { z } from "zod";

export const editTestSchema = z.object({
  testId: z.string().uuid(),
  testName: z.string().min(1, "Назва обов'язкова"),
  description: z.string().optional(),
});

export type EditTestSchema = z.infer<typeof editTestSchema>;