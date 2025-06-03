import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ILearningMaterialService } from "./interfaces/ILearningMaterialService";
import type { EditLearningMaterialsSchema } from "../schemas/LearningMaterialService/editLearningMaterials.schema";
import type { EditLearningMaterialsResponse } from "../responses/LearningService/EditLearningMaterialsResponse";

const ROUTE_NAME = "material";

@injectable()
export class LearningMaterialService implements ILearningMaterialService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async editLearningMaterials(input: EditLearningMaterialsSchema, accessToken: string): Promise<EditLearningMaterialsResponse> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/edit`,
			method: HttpMethod.PUT,
			accessToken,
			body: {
				...input,
			},
		});
	}
}
