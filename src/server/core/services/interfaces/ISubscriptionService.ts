import type { SubscriptionResponse } from "../../responses/SubscriptionService/GetAllSubscriptionsResponse";
import type {
	CreateSubscriptionSchema,
	DeleteSubscriptionSchema,
	EditSubscriptionSchema,
} from "../../schemas/SubscriptionService/createSubscription.schema";

export interface ISubscriptionService {
	getAll(): Promise<{ plans: SubscriptionResponse[] }>;
	create(input: CreateSubscriptionSchema, accessToken: string): Promise<void>;
	edit(input: EditSubscriptionSchema, accessToken: string): Promise<void>;
	delete(input: DeleteSubscriptionSchema, accessToken: string): Promise<void>;
}
