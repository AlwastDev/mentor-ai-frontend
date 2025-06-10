import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import { type ITestService } from "./interfaces/ITestService";
import type { AddTestSchema } from "../schemas/TestService/addTest.schema";
import type { EditTestSchema } from "../schemas/TestService/editTest.schema";
import type { GetAllTestsResponse } from "../responses/TestService/GetAllTestsResponse";
import type { GetByIdResponse } from "../responses/TestService/GetByIdResponse";
import type { GetPublishedResponse } from "../responses/TestService/GetPublishedResponse";

const ROUTE_NAME = "test";

@injectable()
export class TestService implements ITestService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async createTest(input: AddTestSchema, accessToken: string): Promise<string> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/add`,
			method: HttpMethod.POST,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async editTest(input: EditTestSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/edit`,
			method: HttpMethod.PUT,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async publishTest(testId: string, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/publish`,
			method: HttpMethod.POST,
			accessToken,
			body: {
				testId,
			},
		});
	}

	async deleteTest(id: string, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/delete/${id}`,
			method: HttpMethod.DELETE,
			accessToken,
		});
	}

	async getAllTests(
		accessToken: string,
		page: number,
		limit: number,
	): Promise<{ items: GetAllTestsResponse[]; totalCount: number }> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get`,
			method: HttpMethod.GET,
			accessToken,
			query: {
				page,
				limit,
			},
		});
	}

	async getById(
		id: string,
		accessToken: string,
	): Promise<GetByIdResponse | null> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get/${id}`,
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async getPublished(accessToken: string): Promise<GetPublishedResponse[]> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get/published`,
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async getPublishedById(
		id: string,
		accessToken: string,
	): Promise<GetByIdResponse | null> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get/published/${id}`,
			method: HttpMethod.GET,
			accessToken,
		});
	}
}
