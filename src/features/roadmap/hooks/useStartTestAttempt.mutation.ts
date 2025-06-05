import { useRouter } from "next/navigation";

import { useNotification } from "@/shared/hooks";
import { ROUTES } from "@/shared/utils/routes";
import { trpc } from "@/shared/utils/trpc";

export const useStartTestAttemptMutation = () => {
  const n = useNotification();
  const router = useRouter();

	const { mutate, isPending } = trpc.testAttempt.start.useMutation({
    onSuccess(id) {
			router.push(ROUTES.Learning.TestAttempt(id));
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

	return { startTestAttempt: mutate, isPending };
};