import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";
import { useModalStore } from "@/shared/store";

export const useCompleteTestAttemptMutation = (storageKey: string) => {
  const n = useNotification();
	const { openModal } = useModalStore();
	const utils = trpc.useUtils(); 

	const { mutate, isPending } = trpc.testAttempt.complete.useMutation({
    onSuccess(item) {
      openModal("RewardModal", { coins: item.coins, experience: item.experience, score: item.score });
			localStorage.removeItem(storageKey);
			utils.roadmap.get.invalidate();
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

	return { completeTestAttempt: mutate, isPending };
};