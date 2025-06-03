import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { IStudentSubscriptionService } from "@/server/core/services/interfaces/IStudentSubscriptionService";
import { addStudentSubscriptionSchema } from "@/server/core/schemas/StudentSubscriptionService/addStudentSubscription.schema";

const studentSubscriptionService = container.get<IStudentSubscriptionService>(
	SYMBOLS.IStudentSubscriptionService,
);

export const studentSubscriptionRouter = createTRPCRouter({
	add: protectedProcedure
		.input(addStudentSubscriptionSchema)
		.mutation(async ({ input, ctx }) =>
			studentSubscriptionService.add({ ...input }, ctx.access_token),
		),
});
