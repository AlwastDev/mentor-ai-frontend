import type {
	GetByIdResponse,
	GetAllTestsResponse,
	GetPublishedResponse,
} from "../../responses/TestService.responses";
import type { CreateTestSchema, EditTestSchema } from "../../schemas/TestService.schemas";

export interface ITestService {
	createTest(input: CreateTestSchema, accessToken: string): Promise<void>;
	editTest(input: EditTestSchema, accessToken: string): Promise<void>;
	publishTest(testId: string, accessToken: string): Promise<void>;
	deleteTest(id: string, accessToken: string): Promise<void>;
	getAllTests(accessToken: string, page: number, limit: number): Promise<GetAllTestsResponse[]>;
	getById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
	getPublished(accessToken: string): Promise<GetPublishedResponse[]>;
	getPublishedById(id: string, accessToken: string): Promise<GetByIdResponse | null>;
}
