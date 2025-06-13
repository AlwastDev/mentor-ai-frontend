import type { LoginSchema } from "@/server/core/schemas/AuthService/login.schema";
import type { RegisterSchema } from "@/server/core/schemas/AuthService/register.schema";
import type { SessionUser } from "@/shared/utils/types";
import type { ChangePasswordInput } from "../../schemas/AuthService/change-password.schema";

export interface IAuthService {
	me(accessToken: string): Promise<SessionUser>;
	login(
		input: LoginSchema,
	): Promise<{ accessToken: string; refreshToken: string }>;
	register(
		input: RegisterSchema,
	): Promise<{ accessToken: string; refreshToken: string }>;
	refreshToken(token: string): Promise<{ accessToken: string }>;
	logout(accessToken: string): Promise<void>;
	changePassword(input: ChangePasswordInput, accessToken: string): Promise<void>
	deleteAccount(accessToken: string): Promise<void>;
}
