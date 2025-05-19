import "reflect-metadata";
import { Container } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { ApiService } from "./core/services/ApiService";
import type { IApiService } from "./core/services/interfaces/IApiService";
import type { ITestService } from "./core/services/interfaces/ITestService";
import { TestService } from "./core/services/TestService";
import type { IQuestionService } from "./core/services/interfaces/IQuestionService";
import { QuestionService } from "./core/services/QuestionService";
import type { ILearningMaterialService } from "./core/services/interfaces/ILearningMaterialService";
import { LearningMaterialService } from "./core/services/LearningMaterialService";

const container = new Container();

container.bind<IApiService>(SYMBOLS.IApiService).to(ApiService);
container.bind<ITestService>(SYMBOLS.ITestService).to(TestService);
container.bind<IQuestionService>(SYMBOLS.IQuestionService).to(QuestionService);
container.bind<ILearningMaterialService>(SYMBOLS.ILearningMaterialService).to(LearningMaterialService);

export { container };
