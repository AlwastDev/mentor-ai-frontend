import type { EditLearningMaterialsResponse } from "../../responses/LearningService/EditLearningMaterialsResponse";
import type { GetMaterialByPublishedTestIdResponse } from "../../responses/LearningService/GetMaterialByPublishedTestIdResponse";
import type { EditLearningMaterialsSchema } from "../../schemas/LearningMaterialService/editLearningMaterials.schema";

export interface ILearningMaterialService {
	getPublishedByTestId(testId: string, accessToken: string): Promise<{ materials: GetMaterialByPublishedTestIdResponse[]}>;
	editLearningMaterials(input: EditLearningMaterialsSchema, accessToken: string): Promise<EditLearningMaterialsResponse>;
}