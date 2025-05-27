import type { LoginSchema, RegisterSchema } from "@/server/core/schemas/AuthService.schemas";
import type { SessionUser } from "@/shared/utils/types";

export interface IAuthService {
	me(accessToken: string): Promise<SessionUser>;
	login(input: LoginSchema): Promise<void>;
	register(input: RegisterSchema): Promise<void>;
	refreshToken(token: string): Promise<{ accessToken: string }>;
	logout(accessToken: string): Promise<void>;
}
