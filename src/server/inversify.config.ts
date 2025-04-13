import "reflect-metadata";
import { Container } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { ApiService } from "./core/services/ApiService";
import { IApiService } from "./core/services/interfaces/IApiService";
import { ITokenService } from "./core/services/interfaces/ITokenService";
import { TokenService } from "./core/services/TokenService";

const container = new Container();

container.bind<IApiService>(SYMBOLS.IApiService).to(ApiService);
container.bind<ITokenService>(SYMBOLS.ITokenService).to(TokenService);

export { container };
