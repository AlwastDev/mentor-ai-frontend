import { z } from "zod";

export const addStudentSubscriptionSchema = z.object({
	data: z.string(),
	signature: z.string(),
});

export type AddStudentSubscriptionSchema = z.infer<typeof addStudentSubscriptionSchema>;