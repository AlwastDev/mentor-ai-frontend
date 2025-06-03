import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";

export const useEditSubscriptionMutation = () => {
  const n = useNotification();
  
  const { mutate, isPending } = trpc.subscription.edit.useMutation({
		onSuccess() {
			n.success("План підписки був успішно оновлений");
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

  return { editSubscription: mutate, isPending };
};