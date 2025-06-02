export interface GetByIdResponse {
  id: string;
  testName: string;
  description?: string;
  isEntryTest: boolean;
  questions: QuestionDetailsResponse[];
  materials: LearningMaterialResponse[];
}

export interface QuestionDetailsResponse {
  id: string;
  questionText: string;
  answers: AnswerDetailsResponse[];
}

export interface AnswerDetailsResponse {
  id: string;
  answerText: string;
  isCorrect: boolean;
}

export interface LearningMaterialResponse {
  id: string;
  title: string;
  content: string;
}
