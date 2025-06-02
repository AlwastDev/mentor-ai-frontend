import { adminProcedure, createTRPCRouter } from "../trpc";
import { SYMBOLS } from "@/server/constants/symbols";
import { container } from "@/server/inversify.config";
import type { ILearningMaterialService } from "@/server/core/services/interfaces/ILearningMaterialService";
import { editLearningMaterialsSchema } from "@/server/core/schemas/LearningMaterialService/editLearningMaterials.schema";

const learningMaterialService = container.get<ILearningMaterialService>(
	SYMBOLS.ILearningMaterialService,
);

export const learningMaterialRouter = createTRPCRouter({
	edit: adminProcedure
		.input(editLearningMaterialsSchema)
		.mutation(async ({ input, ctx }) =>
			learningMaterialService.editLearningMaterials({ ...input }, ctx.access_token!),
		),
});
