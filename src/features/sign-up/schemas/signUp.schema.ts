import { z } from "zod";

export const signUpInputSchema = z.object({
	name: z.string().min(1),
	surname: z.string().min(1),
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Пароль має містити щонайменше 8 символів")
		.regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру")
		.regex(/[a-z]/, "Пароль повинен містити хоча б одну малу літеру")
		.regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
		.regex(/[^A-Za-z0-9]/, "Пароль повинен містити хоча б один спецсимвол"),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
