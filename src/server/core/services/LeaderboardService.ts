import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ILeaderboardService } from "./interfaces/ILeaderboardService";
import type { GetTopLeaderboardResponse } from "../responses/LeaderboardService/GetTopLeaderboardResponse";

const ROUTE_NAME = "leaderboard";

@injectable()
export class LeaderboardService implements ILeaderboardService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getTop(accessToken: string): Promise<GetTopLeaderboardResponse[]> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/top`,
			method: HttpMethod.GET,
			accessToken,
		});
	}
}
