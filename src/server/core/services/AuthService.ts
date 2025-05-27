import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IAuthService } from "./interfaces/IAuthService";
import type { LoginSchema, RegisterSchema } from "../schemas/AuthService.schemas";
import type { SessionUser } from "@/shared/utils/types";

@injectable()
export class AuthService implements IAuthService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async me(accessToken: string): Promise<SessionUser> {
		return await this.apiService.sendRequest({
			url: "auth/me",
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async login(input: LoginSchema): Promise<void> {
		return await this.apiService.sendRequest({
			url: "auth/login",
			method: HttpMethod.POST,
			body: {
				...input,
			},
		});
	}

	async register(input: RegisterSchema): Promise<void> {
		return await this.apiService.sendRequest({
			url: "auth/register",
			method: HttpMethod.POST,
			body: {
				...input,
			},
		});
	}

	async refreshToken(token: string): Promise<{ accessToken: string }> {
		return await this.apiService.sendRequest({
			url: "auth/refresh",
			method: HttpMethod.POST,
			body: {
				token,
			},
		});
	}

	async logout(accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "auth/logout",
			method: HttpMethod.POST,
			accessToken,
		});
	}
}
