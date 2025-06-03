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
import { AuthService } from "./core/services/AuthService";
import type { IAuthService } from "./core/services/interfaces/IAuthService";
import type { ISubscriptionService } from "./core/services/interfaces/ISubscriptionService";
import { SubscriptionService } from "./core/services/SubscriptionService";
import type { IStudentSubscriptionService } from "./core/services/interfaces/IStudentSubscriptionService";
import { StudentSubscriptionService } from "./core/services/StudentSubscriptionService";

const container = new Container();

container.bind<IApiService>(SYMBOLS.IApiService).to(ApiService);
container.bind<IAuthService>(SYMBOLS.IAuthService).to(AuthService);
container.bind<ITestService>(SYMBOLS.ITestService).to(TestService);
container.bind<IQuestionService>(SYMBOLS.IQuestionService).to(QuestionService);
container.bind<ILearningMaterialService>(SYMBOLS.ILearningMaterialService).to(LearningMaterialService);
container.bind<ISubscriptionService>(SYMBOLS.ISubscriptionService).to(SubscriptionService);
container.bind<IStudentSubscriptionService>(SYMBOLS.IStudentSubscriptionService).to(StudentSubscriptionService);

export { container };
