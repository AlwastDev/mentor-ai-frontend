import { z } from "zod";

export const loginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	name: z.string().min(1),
	surname: z.string().min(1),
});

export type RegisterSchema = z.infer<typeof registerInputSchema>;