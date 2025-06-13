import { inject, injectable } from "inversify";

import { SYMBOLS } from "@/server/constants/symbols";
import { HttpMethod, type IApiService } from "./interfaces/IApiService";
import type { IStudentSubscriptionService } from "./interfaces/IStudentSubscriptionService";
import type { AddStudentSubscriptionSchema } from "../schemas/StudentSubscriptionService/addStudentSubscription.schema";

const ROUTE_NAME = "student/subscription/plan";

@injectable()
export class StudentSubscriptionService implements IStudentSubscriptionService {
	constructor(@inject(SYMBOLS.IApiService) private apiService: IApiService) {}

	async add(input: AddStudentSubscriptionSchema): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/add`,
			method: HttpMethod.POST,
			body: input,
		});
	}

	async delete(accessToken: string): Promise<void> {
		return await this.apiService.sendRequest({
			url: `${ROUTE_NAME}/delete`,
			method: HttpMethod.DELETE,
			accessToken
		});
	}
}
