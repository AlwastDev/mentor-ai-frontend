import "reflect-metadata";
import { Container } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { ApiService } from "./core/services/ApiService";
import type { IApiService } from "./core/services/interfaces/IApiService";
import type { ITestService } from "./core/services/interfaces/ITestService";
import { TestService } from "./core/services/TestService";

const container = new Container();

container.bind<IApiService>(SYMBOLS.IApiService).to(ApiService);
container.bind<ITestService>(SYMBOLS.ITestService).to(TestService);

export { container };
