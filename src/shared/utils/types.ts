import { type UserRole } from "./enums";

export interface SessionUser {
	id: string;
	email: string;
	name?: string;
	surname?: string;
	role: UserRole;
	coins: number;
	experience: number;

	hasSubscription: boolean;
	planName?: string;
	accessToAiSupportChat: boolean;
	accessToCharts: boolean;
	bonusCoins: number;
}
