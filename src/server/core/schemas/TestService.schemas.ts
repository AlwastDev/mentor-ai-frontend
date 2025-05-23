import { z } from "zod";

export const createTestSchema = z.object({
  testName: z.string().min(1, "Назва обов'язкова"),
  description: z.string().optional(),
  isEntryTest: z.boolean(),
});

export type CreateTestSchema = z.infer<typeof createTestSchema>;

export const editTestSchema = z.object({
  testId: z.string().uuid(),
  testName: z.string().min(1, "Назва обов'язкова"),
  description: z.string().optional(),
  isEntryTest: z.boolean(),
});

export type EditTestSchema = z.infer<typeof editTestSchema>;