import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IQuestionService } from "./interfaces/IQuestionService";
import type { EditQuestionsSchema } from "../schemas/QuestionService/editQuestion.schema";
import type { EditQuestionsResponse } from "../responses/LearningService/EditQuestionsResponse";

@injectable()
export class QuestionService implements IQuestionService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async editQuestion(input: EditQuestionsSchema, accessToken: string): Promise<EditQuestionsResponse> {
		return await this.apiService.sendRequest({
			url: "question/edit",
			method: HttpMethod.PUT,
			accessToken,
			body: {
				...input,
			},
		});
	}
}
