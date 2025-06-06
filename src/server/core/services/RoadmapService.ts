import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IRoadmapService } from "./interfaces/IRoadmapService.ts";
import type { GetRoadmapResponse } from "../responses/RoadmapService/getRoadmap.response";

const ROUTE_NAME = "roadmap";

@injectable()
export class RoadmapService implements IRoadmapService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async get(accessToken: string): Promise<GetRoadmapResponse[]> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get`,
			method: HttpMethod.GET,
			accessToken,
		});
	}

	async generate(accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/generate`,
			method: HttpMethod.POST,
			accessToken,
		});
	}
}
