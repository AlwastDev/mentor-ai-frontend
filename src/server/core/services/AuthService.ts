import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IAuthService } from "./interfaces/IAuthService";
import type { LoginSchema } from "../schemas/AuthService/login.schema";
import type { RegisterSchema } from "../schemas/AuthService/register.schema";
import type { SessionUser } from "@/shared/utils/types";
import type { ChangePasswordInput } from "../schemas/AuthService/change-password.schema";

const ROUTE_NAME = "auth";

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async me(accessToken: string): Promise<SessionUser> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/me`,
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async login(
		input: LoginSchema,
	): Promise<{ accessToken: string; refreshToken: string }> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/login`,
			method: HttpMethod.POST,
			body: {
				...input,
			},
		});
	}

	async register(
		input: RegisterSchema,
	): Promise<{ accessToken: string; refreshToken: string }> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/register`,
			method: HttpMethod.POST,
			body: {
				...input,
			},
		});
	}

	async refreshToken(token: string): Promise<{ accessToken: string }> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/refresh`,
			method: HttpMethod.POST,
			body: {
				token,
			},
		});
	}

	async logout(accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/logout`,
			method: HttpMethod.POST,
			accessToken,
		});
	}

	async changePassword(input: ChangePasswordInput, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/change-password`,
			method: HttpMethod.POST,
			body: input,
			accessToken,
		});
	}
}
