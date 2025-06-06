import { trpc } from "@/shared/utils/trpc";

export const useGetPublishedByTestIdQuery = (id: string) => {
	const { data, error, isLoading } = trpc.learningMaterial.getPublishedByTestId.useQuery(id);

	return { materials: data?.materials ?? [], error, isLoading };
};
