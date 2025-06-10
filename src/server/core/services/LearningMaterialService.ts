import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ILearningMaterialService } from "./interfaces/ILearningMaterialService";
import type { EditLearningMaterialsSchema } from "../schemas/LearningMaterialService/editLearningMaterials.schema";
import type { EditLearningMaterialsResponse } from "../responses/LearningService/EditLearningMaterialsResponse";
import type { GetMaterialByPublishedTestIdResponse } from "../responses/LearningService/GetMaterialByPublishedTestIdResponse";
import { markdownToHtml } from "@/shared/utils/helpers";

const ROUTE_NAME = "material";

@injectable()
export class LearningMaterialService implements ILearningMaterialService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getPublishedByTestId(
		testId: string,
		accessToken: string,
	): Promise<{ materials: GetMaterialByPublishedTestIdResponse[] }> {
		const response = await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get/published/${testId}`,
			method: HttpMethod.GET,
			accessToken,
		}) as { materials: GetMaterialByPublishedTestIdResponse[] };

		if(response.materials.length === 0) {
			return { materials: [] };
		}

		const htmlMaterials = await Promise.all(
      response.materials.map(async (m) => ({
        ...m,
				content: await markdownToHtml(m.content),
			})),
		);

		return { materials: htmlMaterials };
	}

	async editLearningMaterials(
		input: EditLearningMaterialsSchema,
		accessToken: string,
	): Promise<{ materials: EditLearningMaterialsResponse[] }> {
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
