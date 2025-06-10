import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ITestAttemptService } from "./interfaces/ITestAttemptService";
import type { CompleteTestAttemptResponse } from "../responses/TestAttemptService/CompleteTestAttemptResponse";
import type { StartTestAttemptSchema } from "../schemas/TestAttemptService/startTestAttempt.schema";
import type { CompleteTestAttemptSchema } from "../schemas/TestAttemptService/completeTestAttempt.schema";
import type { GetByIdTestAttemptResponse } from "../responses/TestAttemptService/GetByIdTestAttemptResponse";
import { markdownToHtml } from "@/shared/utils/helpers";

const ROUTE_NAME = "testAttempt";

@injectable()
export class TestAttemptService implements ITestAttemptService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getTestAttemptById(
		testAttemptId: string,
		accessToken: string,
	): Promise<GetByIdTestAttemptResponse> {
		const response = await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get/${testAttemptId}`,
			method: HttpMethod.GET,
			accessToken,
		}) as GetByIdTestAttemptResponse;

		const htmlQuestions = await Promise.all(
			response.questions.map(async (q) => ({
				...q,
				questionText: await markdownToHtml(q.questionText),
				answers: await Promise.all(q.answers.map(async (a) => ({
					...a,
					answerText: await markdownToHtml(a.answerText),
				}))),
			})),
		);

		return {
			...response,
			questions: htmlQuestions,
		};
	}

	async start(
		input: StartTestAttemptSchema,
		accessToken: string,
	): Promise<string> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/start`,
			method: HttpMethod.POST,
			body: input,
			accessToken,
		});
	}

	async startEntry(accessToken: string): Promise<string> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/start-entry`,
			method: HttpMethod.POST,
			accessToken,
		});
	}

	async complete(
		input: CompleteTestAttemptSchema,
		accessToken: string,
	): Promise<CompleteTestAttemptResponse> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/complete`,
			method: HttpMethod.POST,
			body: input,
			accessToken,
		});
	}
}
