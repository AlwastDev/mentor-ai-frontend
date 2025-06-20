import type { GetRoadmapResponse } from "../../responses/RoadmapService/getRoadmap.response";

export interface IRoadmapService {
	get(accessToken: string): Promise<GetRoadmapResponse[]>;
	generate(accessToken: string): Promise<string>;
}
