import { z } from "zod";

export const signUpInputSchema = z.object({
	name: z.string().min(1),
	surname: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(8),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
