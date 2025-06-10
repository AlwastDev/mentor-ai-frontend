import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ISubscriptionService } from "./interfaces/ISubscriptionService";
import type {
	CreateSubscriptionSchema,
	DeleteSubscriptionSchema,
	EditSubscriptionSchema,
} from "../schemas/SubscriptionService/createSubscription.schema";
import type { SubscriptionResponse } from "../responses/SubscriptionService/GetAllSubscriptionsResponse";

const ROUTE_NAME = "subscription/plan";

@injectable()
export class SubscriptionService implements ISubscriptionService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async getAll(): Promise<{ plans: SubscriptionResponse[] }> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/get`,
			method: HttpMethod.GET,
		});
	}

	async create(
		input: CreateSubscriptionSchema,
		accessToken: string,
	): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/create`,
			method: HttpMethod.POST,
			accessToken,
			body: input,
		});
	}

	async edit(
		input: EditSubscriptionSchema,
		accessToken: string,
	): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/edit`,
			method: HttpMethod.PUT,
			accessToken,
			body: input,
		});
	}

	async delete(
		input: DeleteSubscriptionSchema,
		accessToken: string,
	): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/delete/${input.id}`,
			method: HttpMethod.DELETE,
			accessToken,
		});
	}
}
