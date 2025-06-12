import type { GetAllTestsResponse } from "../../responses/TestService/GetAllTestsResponse";
import type { GetByIdResponse } from "../../responses/TestService/GetByIdResponse";
import type { AddTestSchema } from "../../schemas/TestService/addTest.schema";
import type { EditTestSchema } from "../../schemas/TestService/editTest.schema";

export interface ITestService {
	createTest(input: AddTestSchema, accessToken: string): Promise<string>;
	editTest(input: EditTestSchema, accessToken: string): Promise<void>;
	publishTest(testId: string, accessToken: string): Promise<void>;
	deleteTest(id: string, accessToken: string): Promise<void>;
	getAllTests(
		accessToken: string,
		page: number,
		limit: number,
	): Promise<{ items: GetAllTestsResponse[]; totalCount: number }>;
	getById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
}
