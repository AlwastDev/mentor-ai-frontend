import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ITestService } from "@/server/core/services/interfaces/ITestService";
import { paginationSchema } from "@/shared/schemas/pagination.schema";
import { addTestSchema } from "@/server/core/schemas/TestService/addTest.schema";
import { editTestSchema } from "@/server/core/schemas/TestService/editTest.schema";

const testService = container.get<ITestService>(SYMBOLS.ITestService);

export const testRouter = createTRPCRouter({
	create: adminProcedure
		.input(addTestSchema)
		.mutation(async ({ input, ctx }) =>
			testService.createTest({ ...input }, ctx.access_token),
		),

	edit: adminProcedure
		.input(editTestSchema)
		.mutation(async ({ input, ctx }) =>
			testService.editTest({ ...input }, ctx.access_token),
		),

	publish: adminProcedure
		.input(z.string().uuid())
		.mutation(async ({ input, ctx }) =>
			testService.publishTest(input, ctx.access_token),
		),

	delete: adminProcedure
		.input(z.string().uuid())
		.mutation(async ({ input, ctx }) =>
			testService.deleteTest(input, ctx.access_token),
		),

	getAllTests: adminProcedure
		.input(paginationSchema)
		.query(async ({ input, ctx }) =>
			testService.getAllTests(ctx.access_token, input.page, input.limit),
		),

	getById: adminProcedure
		.input(z.string().uuid())
		.query(async ({ input, ctx }) =>
			testService.getById(input, ctx.access_token),
		),

	getPublished: protectedProcedure.query(async ({ ctx }) =>
		testService.getPublished(ctx.access_token),
	),

	getPublishedById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) =>
			testService.getPublishedById(input, ctx.access_token),
		),
});
