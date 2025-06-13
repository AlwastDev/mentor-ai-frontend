import { z } from "zod";

export const changePasswordInputSchema = z.object({
	currentPassword: z.string().min(8),
	newPassword: z
		.string()
		.min(8, "Пароль має містити щонайменше 8 символів")
		.regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру")
		.regex(/[a-z]/, "Пароль повинен містити хоча б одну малу літеру")
		.regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
		.regex(/[^A-Za-z0-9]/, "Пароль повинен містити хоча б один спецсимвол"),
});

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;