import type {
	CreateQuestionSchema,
	EditQuestionSchema,
} from "../../schemas/QuestionService.schemas";

export interface IQuestionService {
	createQuestion(input: CreateQuestionSchema, accessToken: string): Promise<void>;
	editQuestion(input: EditQuestionSchema, accessToken: string): Promise<void>;
	deleteQuestion(id: string, accessToken: string): Promise<void>;
}
