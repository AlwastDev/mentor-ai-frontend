import { type UserRole } from "./enums";

export interface SessionUser {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	referralCode: string;
}
