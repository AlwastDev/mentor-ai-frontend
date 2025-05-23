import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import { type ITestService } from "./interfaces/ITestService";
import type {
	GetAllTestsResponse,
	GetByIdResponse,
	GetPublishedResponse,
} from "../responses/TestService.responses";
import type { CreateTestSchema, EditTestSchema } from "../schemas/TestService.schemas";

@injectable()
export class TestService implements ITestService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async createTest(input: CreateTestSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "test/add",
			method: HttpMethod.POST,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async editTest(input: EditTestSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "test/edit",
			method: HttpMethod.PUT,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async publishTest(testId: string, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "test/publish",
			method: HttpMethod.POST,
			accessToken,
			body: {
				testId,
			},
		});
	}

	async deleteTest(id: string, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "test/delete",
			method: HttpMethod.DELETE,
			accessToken,
			query: {
				id,
			},
		});
	}

	async getAllTests(
		accessToken: string,
		page: number,
		limit: number,
	): Promise<GetAllTestsResponse[]> {
		return await this.apiService.sendRequest({
			url: "test/get",
			method: HttpMethod.GET,
			accessToken,
			query: {
				page,
				limit,
			},
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
