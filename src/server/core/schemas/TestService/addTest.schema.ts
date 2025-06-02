import { z } from "zod";

export const addTestSchema = z.object({
  testName: z.string().min(1, "Назва обов'язкова"),
  description: z.string().optional(),
  isEntryTest: z.boolean(),
});

export type AddTestSchema = z.infer<typeof addTestSchema>;