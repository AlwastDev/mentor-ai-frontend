export interface GetAllTestsResponse {
  id: string;
  testName: string;
  description?: string;
  isEntryTest: boolean;
  isPublished: boolean;
}

export interface GetPublishedResponse {
  id: string;
  testName: string;
  description?: string;
  isEntryTest: boolean;
}

//GetByIdTestResponse Start
export interface GetByIdResponse {
  id: string;
  testName: string;
  description?: string;
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
}

export interface LearningMaterialResponse {
  id: string;
  title: string;
  content: string;
}

//End