import type { GetAllTestsResponse } from "../../responses/TestService/GetAllTestsResponse";
import type { GetByIdResponse } from "../../responses/TestService/GetByIdResponse";
import type { GetPublishedResponse } from "../../responses/TestService/GetPublishedResponse";
import type { AddTestSchema } from "../../schemas/TestService/addTest.schema";
import type { EditTestSchema } from "../../schemas/TestService/editTest.schema";

export interface ITestService {
	createTest(input: AddTestSchema, accessToken: string): Promise<string>;
	editTest(input: EditTestSchema, accessToken: string): Promise<void>;
	publishTest(testId: string, accessToken: string): Promise<void>;
	deleteTest(id: string, accessToken: string): Promise<void>;
	getAllTests(accessToken: string, page: number, limit: number): Promise<GetAllTestsResponse[]>;
	getById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
	getPublished(accessToken: string): Promise<GetPublishedResponse[]>;
	getPublishedById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
}
