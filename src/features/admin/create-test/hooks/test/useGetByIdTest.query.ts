import { trpc } from "@/shared/utils/trpc";

export const useGetByIdTestQuery = (id: string) => {
	const { data, isLoading } = trpc.test.getById.useQuery(id, {
		enabled: !!id,
	});

	return { test: data, isLoading };
};
