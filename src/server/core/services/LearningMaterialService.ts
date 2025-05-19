import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ILearningMaterialService } from "./interfaces/ILearningMaterialService";
import type { AddLearningMaterialSchema, EditLearningMaterialSchema } from "../schemas/LearningMaterialService.schemas";

@injectable()
export class LearningMaterialService implements ILearningMaterialService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async createLearningMaterial(input: AddLearningMaterialSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "material/add",
			method: HttpMethod.POST,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async editLearningMaterial(input: EditLearningMaterialSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "material/edit",
			method: HttpMethod.PUT,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async deleteLearningMaterial(id: string, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "material/delete",
			method: HttpMethod.DELETE,
			accessToken,
			query: {
				id,
			},
		});
	}
}
