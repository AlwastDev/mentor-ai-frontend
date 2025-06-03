import { DESKTOP_PAGE_SIZE } from "@/shared/utils/constants";
import { trpc } from "@/shared/utils/trpc";

export const useGetAllTestsQuery = (page: number) => {
	const { data, isLoading, refetch } = trpc.test.getAllTests.useQuery({
		page,
		limit: DESKTOP_PAGE_SIZE,
	});

	return { tests: data, isLoading, refetch };
};
