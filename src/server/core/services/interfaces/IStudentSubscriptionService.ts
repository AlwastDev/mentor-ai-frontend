import type { AddStudentSubscriptionSchema } from "../../schemas/StudentSubscriptionService/addStudentSubscription.schema";

export interface IStudentSubscriptionService {
	add(input: AddStudentSubscriptionSchema): Promise<void>;
}
