import { z } from "zod";

export const studentAnswerRequestSchema = z.object({
  questionId: z.string().uuid(),
  answerId: z.string().uuid(),
});

export const completeTestAttemptSchema = z.object({
  studentId: z.string().uuid(),
  testAttemptId: z.string().uuid(),
  answers: z.array(studentAnswerRequestSchema),
});

export type StudentAnswerSchema = z.infer<typeof studentAnswerRequestSchema>;
export type CompleteTestAttemptSchema = z.infer<typeof completeTestAttemptSchema>;