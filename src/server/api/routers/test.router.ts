import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ITestService } from "@/server/core/services/interfaces/ITestService";
import { paginationSchema } from "@/shared/schemas/pagination.schema";
import { createTestSchema, editTestSchema } from "@/server/core/schemas/TestService.schemas";

const testService = container.get<ITestService>(SYMBOLS.ITestService);

export const testRouter = createTRPCRouter({
	create: adminProcedure
		.input(createTestSchema)
		.mutation(async ({ input, ctx }) =>
			testService.createTest({ ...input }, ctx.session?.accessToken),
		),

	edit: adminProcedure
		.input(editTestSchema)
		.mutation(async ({ input, ctx }) =>
			testService.editTest({ ...input }, ctx.session?.accessToken),
		),

	publish: adminProcedure
		.input(z.string().uuid())
		.mutation(async ({ input, ctx }) => testService.publishTest(input, ctx.session?.accessToken)),

	delete: adminProcedure
		.input(z.string().uuid())
		.mutation(async ({ input, ctx }) => testService.deleteTest(input, ctx.session?.accessToken)),

	getAllTests: adminProcedure
		.input(paginationSchema)
		.query(async ({ input, ctx }) =>
			testService.getAllTests(ctx.session?.accessToken, input.page, input.limit),
		),

	getById: adminProcedure
		.input(z.string().uuid())
		.query(async ({ input, ctx }) => testService.getById(input, ctx.session?.accessToken)),

	getPublished: protectedProcedure.query(async ({ ctx }) =>
		testService.getPublished(ctx.session?.accessToken),
	),

	getPublishedById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => testService.getPublishedById(input, ctx.session?.accessToken)),
});
