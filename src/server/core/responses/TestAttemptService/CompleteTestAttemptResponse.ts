import { z } from "zod";

export const completeTestAttemptResponseSchema = z.object({
  coins: z.number().int(),
  experience: z.number().int(),
  score: z.number(),
});

export type CompleteTestAttemptResponse = z.infer<typeof completeTestAttemptResponseSchema>;