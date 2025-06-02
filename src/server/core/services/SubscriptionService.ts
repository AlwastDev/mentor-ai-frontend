import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { ISubscriptionService } from "./interfaces/ISubscriptionService";
import type {
	CreateSubscriptionSchema,
	DeleteSubscriptionSchema,
	EditSubscriptionSchema,
} from "../schemas/SubscriptionService/createSubscription.schema";

@injectable()
export class SubscriptionService implements ISubscriptionService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async create(input: CreateSubscriptionSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "subscription/create",
			method: HttpMethod.POST,
			accessToken,
			body: input,
		});
	}

	async edit(input: EditSubscriptionSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: "subscription/edit",
			method: HttpMethod.PUT,
			accessToken,
			body: input,
		});
	}

	async delete(input: DeleteSubscriptionSchema, accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `subscription/delete/${input.id}`,
			method: HttpMethod.DELETE,
			accessToken,
		});
	}
}
