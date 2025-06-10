import { z } from "zod";

export const registerInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	name: z.string().min(1),
	surname: z.string().min(1),
});

export type RegisterSchema = z.infer<typeof registerInputSchema>;
