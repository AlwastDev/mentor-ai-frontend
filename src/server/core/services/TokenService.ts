import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { ITokenService, OverviewType } from "./interfaces/ITokenService";
import { type IApiService } from "./interfaces/IApiService";

@injectable()
export class TokenService implements ITokenService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getOverview() {
		const response = await fetch("http://localhost:3000/api/token/overview");
		const data = (await response.json()) as OverviewType;

		const chartsData = data.data.map((item, index, arr) => ({
			volume: item.volume,
			high: item.high,
			date: new Date(
				Date.now() - (arr.length - 1 - index) * 24 * 60 * 60 * 1000
			)
				.toISOString()
				.split("T")[0],
		}));

		return chartsData;
	}

	async getTokenPrice() {
		const response = await fetch("http://localhost:3000/api/token/price");
		const data = await response.json();
		return data;
	}
}
