import type { GetTopLeaderboardResponse } from "../../responses/LeaderboardService/GetTopLeaderboardResponse";


export interface ILeaderboardService {
	getTop(accessToken: string): Promise<GetTopLeaderboardResponse[]>;
}