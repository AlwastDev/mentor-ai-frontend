import { adminProcedure, createTRPCRouter } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ISubscriptionService } from "@/server/core/services/interfaces/ISubscriptionService";
import {
	createSubscriptionSchema,
	deleteSubscriptionSchema,
	editSubscriptionSchema,
} from "@/server/core/schemas/SubscriptionService/createSubscription.schema";

const subscriptionService = container.get<ISubscriptionService>(SYMBOLS.ISubscriptionService);

export const subscriptionRouter = createTRPCRouter({
	create: adminProcedure
		.input(createSubscriptionSchema)
		.mutation(async ({ input, ctx }) => subscriptionService.create({ ...input }, ctx.access_token)),

	edit: adminProcedure
		.input(editSubscriptionSchema)
		.mutation(async ({ input, ctx }) => subscriptionService.edit({ ...input }, ctx.access_token)),

	delete: adminProcedure
		.input(deleteSubscriptionSchema)
		.mutation(async ({ input, ctx }) => subscriptionService.delete({ ...input }, ctx.access_token)),
});
