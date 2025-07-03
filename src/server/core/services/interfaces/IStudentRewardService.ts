import type { GetStudentRewardHistoryResponse } from "../../responses/StudentRewardService/GetStudentRewardHistoryResponse";

export interface IStudentRewardService {
	getHistory(accessToken: string): Promise<GetStudentRewardHistoryResponse[]>;
} 