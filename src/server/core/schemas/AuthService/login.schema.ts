import { z } from "zod";

export const loginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginInputSchema>;