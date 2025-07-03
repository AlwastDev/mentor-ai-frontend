import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IStudentRewardService } from "./interfaces/IStudentRewardService";
import type { GetStudentRewardHistoryResponse } from "../responses/StudentRewardService/GetStudentRewardHistoryResponse";

const ROUTE_NAME = "student/reward";

@injectable()
export class StudentRewardService implements IStudentRewardService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getHistory(accessToken: string): Promise<GetStudentRewardHistoryResponse[]> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/history`,
			method: HttpMethod.GET,
			accessToken,
		});
	}
} 