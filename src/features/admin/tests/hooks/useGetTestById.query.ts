import { trpc } from "@/shared/utils/trpc";

export const useGetTestByIdQuery = (id: string) => {
	const { data, isLoading, refetch } = trpc.test.getById.useQuery(id);

	return { test: data, isLoading, refetch };
};
