import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import { type ITestService } from "./interfaces/ITestService";
import type {
	GetAllTestsResponse,
	GetByIdResponse,
	GetPublishedResponse,
} from "../responses/TestService.responses";

@injectable()
export class TestService implements ITestService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getAllTests(accessToken: string): Promise<GetAllTestsResponse[]> {
		return await this.apiService.sendRequest({
			url: "test/get",
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async getById(id: string, accessToken: string): Promise<GetByIdResponse | null> {
		return await this.apiService.sendRequest({
			url: `test/get/${id}`,
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async getPublished(accessToken: string): Promise<GetPublishedResponse[]> {
		return await this.apiService.sendRequest({
			url: `get/published`,
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async getPublishedById(id: string, accessToken: string): Promise<GetByIdResponse | null> {
		return await this.apiService.sendRequest({
			url: `get/published/${id}`,
			method: HttpMethod.GET,
			accessToken,
		});
	}
}
