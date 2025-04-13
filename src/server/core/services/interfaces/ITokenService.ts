import { GetOverviewResponse } from "../../responses/GetTokensResponse";
import { GetTokenPriceResponse } from "../../responses/GetTokenPriceResponse";

export type OverviewType = {
	status: string;
	data: {
		volume: string;
		high: string;
		market_cap: string;
		low: string;
		time: number;
		source: string;
		close: string;
		open: string;
	}[];
};


export interface ITokenService {
	getOverview(): Promise<GetOverviewResponse>;
	getTokenPrice(): Promise<GetTokenPriceResponse>;
}
