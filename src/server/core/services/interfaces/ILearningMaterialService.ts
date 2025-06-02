import type { EditLearningMaterialsResponse } from "../../responses/LearningService/EditLearningMaterialsResponse";
import type { EditLearningMaterialsSchema } from "../../schemas/LearningMaterialService/editLearningMaterials.schema";

export interface ILearningMaterialService {
	editLearningMaterials(input: EditLearningMaterialsSchema, accessToken: string): Promise<EditLearningMaterialsResponse>;
}