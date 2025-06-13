import { useAuth, useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";

export const useDeleteStudentSubscriptionMutation = () => {
	const { refetch } = useAuth();
	const n = useNotification();

	const { mutate: deleteStudentSubscription, isPending } =
		trpc.studentSubscription.delete.useMutation({
			onSuccess() {
				refetch();
				n.success("Ваш план підписки був успішно видалений");
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

	return {
		deleteStudentSubscription,
		isPending,
	};
};
