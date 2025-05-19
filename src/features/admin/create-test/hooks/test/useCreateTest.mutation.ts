import { useNotification } from "@/shared/hooks";
import { trpc } from "@/shared/utils/trpc";

export const useCreateTestMutation = () => {
	const n = useNotification();

	const { mutateAsync: createTest } =
		trpc.test.create.useMutation({
			onSuccess() {
				n.success("Тест був успішно створений");
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

	return { createTest };
};
