import type { CompleteTestAttemptResponse } from "../../responses/TestAttemptService/CompleteTestAttemptResponse";
import type { GetByIdTestAttemptResponse } from "../../responses/TestAttemptService/GetByIdTestAttemptResponse";
import type { CompleteTestAttemptSchema } from "../../schemas/TestAttemptService/completeTestAttempt.schema";
import type { StartTestAttemptSchema } from "../../schemas/TestAttemptService/startTestAttempt.schema";

export interface ITestAttemptService {
	getTestAttemptById(testAttemptId: string, accessToken: string): Promise<GetByIdTestAttemptResponse>;
	start(input: StartTestAttemptSchema, accessToken: string): Promise<string>;
	startEntry(accessToken: string): Promise<string>;
	complete(input: CompleteTestAttemptSchema, accessToken: string): Promise<CompleteTestAttemptResponse>;
}