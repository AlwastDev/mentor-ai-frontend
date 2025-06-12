import { useRouter } from "next/navigation";

import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";
import { ROUTES } from "@/shared/utils/routes";

export const useCreateSubscriptionMutation = () => {
	const router = useRouter();
	const utils = trpc.useUtils();
	const n = useNotification();

	const { mutate, isPending } = trpc.subscription.create.useMutation({
		onSuccess() {
			n.success("План підписки був успішно створений");
			utils.subscription.getAll.invalidate();
			router.push(ROUTES.Admin.Subscriptions.Root);
		},
		onError(error) {
			const fieldErrors = error.shape?.data.zodError?.fieldErrors;
			if (fieldErrors) {
				const firstKey = Object.keys(fieldErrors).find(
					(key) => fieldErrors[key] && fieldErrors[key]!.length > 0,
				);
				if (firstKey && fieldErrors[firstKey]?.[0]) {
					n.error(fieldErrors[firstKey]![0]!);
				} else {
					n.error("Something went wrong");
				}
			} else {
				n.error(error.message);
			}
		},
	});

	return { createSubscription: mutate, isPending };
};
