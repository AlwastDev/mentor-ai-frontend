import type { EditQuestionsResponse } from "../../responses/LearningService/EditQuestionsResponse";
import type { EditQuestionsSchema } from "../../schemas/QuestionService/editQuestion.schema";

export interface IQuestionService {
	editQuestion(
		input: EditQuestionsSchema,
		accessToken: string,
	): Promise<EditQuestionsResponse>;
}
