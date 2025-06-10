import { z } from "zod";

export const createSubscriptionSchema = z.object({
	planName: z
		.string()
		.nonempty("Назва плану обов’язкова")
		.regex(
			/^[a-zA-Z0-9\s]+$/,
			"Назва плану не повинна містити спеціальних символів",
		),

	price: z
		.number({ invalid_type_error: "Ціна повинна бути числом" })
		.min(0, "Ціна повинна бути не менше 0"),

	durationDays: z
		.number({ invalid_type_error: "Тривалість повинна бути числом" })
		.min(0, "Тривалість повинна бути не менше 0"),

	accessToCharts: z.boolean(),
	accessToAISupportChat: z.boolean(),

	bonusCoins: z
		.number({ invalid_type_error: "Бонусні монети повинні бути числом" })
		.min(0, "Бонусні монети повинні бути не менше 0"),
});

export type CreateSubscriptionSchema = z.infer<typeof createSubscriptionSchema>;

export const editSubscriptionSchema = z.object({
	planId: z.string().uuid("Невірний формат ID"),

	planName: z
		.string()
		.nonempty("Назва плану обов’язкова")
		.regex(
			/^[a-zA-Z0-9\s]+$/,
			"Назва плану не повинна містити спеціальних символів",
		),

	price: z
		.number({ invalid_type_error: "Ціна повинна бути числом" })
		.min(0, "Ціна повинна бути не менше 0"),

	durationDays: z
		.number({ invalid_type_error: "Тривалість повинна бути числом" })
		.min(0, "Тривалість повинна бути не менше 0"),

	accessToCharts: z.boolean(),
	accessToAISupportChat: z.boolean(),

	bonusCoins: z
		.number({ invalid_type_error: "Бонусні монети повинні бути числом" })
		.min(0, "Бонусні монети повинні бути не менше 0"),
});

export type EditSubscriptionSchema = z.infer<typeof editSubscriptionSchema>;

export const deleteSubscriptionSchema = z.object({
	id: z.string().uuid(),
});

export type DeleteSubscriptionSchema = z.infer<typeof deleteSubscriptionSchema>;
