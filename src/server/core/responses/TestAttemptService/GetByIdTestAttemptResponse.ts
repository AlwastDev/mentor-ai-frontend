export interface GetByIdTestAttemptResponse {
	id: string;
	testId: string;
	testName: string;
	description?: string;
	questions: QuestionDetailsResponse[];
}

export interface QuestionDetailsResponse {
	id: string;
	questionText: string;
	answers: AnswerDetailsResponse[];
}

export interface AnswerDetailsResponse {
	id: string;
	answerText: string;
}
