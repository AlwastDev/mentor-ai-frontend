import type { GetByIdResponse, GetAllTestsResponse, GetPublishedResponse } from "../../responses/TestService.responses";

export interface ITestService {
	getAllTests(accessToken: string): Promise<GetAllTestsResponse[]>;
	getById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
	getPublished(accessToken: string): Promise<GetPublishedResponse[]>;
	getPublishedById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
}
