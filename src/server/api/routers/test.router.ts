import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ITestService } from "@/server/core/services/interfaces/ITestService";

const testService = container.get<ITestService>(SYMBOLS.ITestService);

export const testRouter = createTRPCRouter({
	getAllTests: adminProcedure.query(async ({ ctx }) =>
		testService.getAllTests(ctx.session?.accessToken),
	),

	getById: adminProcedure
		.input(z.string())
		.query(async ({ input, ctx }) =>
			testService.getById(input, ctx.session?.accessToken),
		),

	getPublished: protectedProcedure.query(async ({ ctx }) =>
		testService.getPublished(ctx.session?.accessToken),
	),

	getPublishedById: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) =>
			testService.getPublishedById(input, ctx.session?.accessToken),
		),
});
