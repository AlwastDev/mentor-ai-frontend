import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ILearningMaterialService } from "@/server/core/services/interfaces/ILearningMaterialService";
import {
	addLearningMaterialSchema,
	editLearningMaterialSchema,
} from "@/server/core/schemas/LearningMaterialService.schemas";

const learningMaterialService = container.get<ILearningMaterialService>(
	SYMBOLS.ILearningMaterialService,
);

export const learningMaterialRouter = createTRPCRouter({
	create: adminProcedure
		.input(addLearningMaterialSchema)
		.mutation(async ({ input, ctx }) =>
			learningMaterialService.createLearningMaterial({ ...input }, ctx.session?.accessToken),
		),

	edit: adminProcedure
		.input(editLearningMaterialSchema)
		.mutation(async ({ input, ctx }) =>
			learningMaterialService.editLearningMaterial({ ...input }, ctx.session?.accessToken),
		),

	delete: adminProcedure
		.input(z.string().uuid())
		.mutation(async ({ input, ctx }) =>
			learningMaterialService.deleteLearningMaterial(input, ctx.session?.accessToken),
		),
});
