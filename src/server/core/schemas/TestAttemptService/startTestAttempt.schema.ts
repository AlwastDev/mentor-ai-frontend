import { z } from "zod";

export const startTestAttemptSchema = z.object({
  studentId: z.string().uuid(),
  testId: z.string().uuid(),
});

export type StartTestAttemptSchema = z.infer<typeof startTestAttemptSchema>;