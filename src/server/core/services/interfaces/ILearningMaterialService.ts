import type { AddLearningMaterialSchema, EditLearningMaterialSchema } from "../../schemas/LearningMaterialService.schemas";

export interface ILearningMaterialService {
	createLearningMaterial(input: AddLearningMaterialSchema, accessToken: string): Promise<void>;
	editLearningMaterial(input: EditLearningMaterialSchema, accessToken: string): Promise<void>;
	deleteLearningMaterial(id: string, accessToken: string): Promise<void>;
}