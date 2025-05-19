import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";

export const useEditQuestionMutation = () => {
	const n = useNotification();

	const { mutateAsync: editQuestion } =
		trpc.question.edit.useMutation({
			onSuccess() {
				n.success("Питання було успішно відредаговано");
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

	return { editQuestion };
};
