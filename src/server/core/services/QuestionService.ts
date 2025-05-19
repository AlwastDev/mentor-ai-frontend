import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IQuestionService } from "./interfaces/IQuestionService";
import type { CreateQuestionSchema, EditQuestionSchema } from "../schemas/QuestionService.schemas";

@injectable()
export class QuestionService implements IQuestionService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async createQuestion(input: CreateQuestionSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "question/add",
			method: HttpMethod.POST,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async editQuestion(input: EditQuestionSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "question/edit",
			method: HttpMethod.PUT,
			accessToken,
			body: {
				...input,
			},
		});
	}

	async deleteQuestion(id: string, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "question/delete",
			method: HttpMethod.DELETE,
			accessToken,
			query: {
				id,
			},
		});
	}
}
