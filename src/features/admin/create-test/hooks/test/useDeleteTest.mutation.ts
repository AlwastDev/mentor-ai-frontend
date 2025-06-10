import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";

export const useDeleteTestMutation = () => {
	const n = useNotification();

	const { mutateAsync: deleteTest } = trpc.test.delete.useMutation({
		onSuccess() {
			n.success("Тест було успішно видалено");
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

	return { deleteTest };
};
