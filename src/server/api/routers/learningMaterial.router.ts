import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ILearningMaterialService } from "@/server/core/services/interfaces/ILearningMaterialService";
import { editLearningMaterialsSchema } from "@/server/core/schemas/LearningMaterialService/editLearningMaterials.schema";

const learningMaterialService = container.get<ILearningMaterialService>(
	SYMBOLS.ILearningMaterialService,
);

export const learningMaterialRouter = createTRPCRouter({
	getPublishedByTestId: protectedProcedure
		.input(z.string().uuid())
		.query(async ({ input, ctx }) =>
			learningMaterialService.getPublishedByTestId(input, ctx.access_token!),
	),

	edit: adminProcedure
		.input(editLearningMaterialsSchema)
		.mutation(async ({ input, ctx }) =>
			learningMaterialService.editLearningMaterials({ ...input }, ctx.access_token!),
		),
});
