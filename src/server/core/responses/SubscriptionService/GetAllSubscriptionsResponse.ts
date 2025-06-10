import { z } from "zod";

export const subscriptionResponseSchema = z.object({
	id: z.string().uuid(),
	planName: z.string(),
	price: z.number(),
	durationDays: z.number(),
	accessToCharts: z.boolean(),
	accessToAISupportChat: z.boolean(),
	bonusCoins: z.number(),
});

export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;
