import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";

export const useEditLearningMaterialMutation = () => {
	const n = useNotification();

	const { mutateAsync: editLearningMaterial } =
		trpc.learningMaterial.edit.useMutation({
			onSuccess() {
				n.success("Матеріал був успішно відредагований");
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

	return { editLearningMaterial };
};
