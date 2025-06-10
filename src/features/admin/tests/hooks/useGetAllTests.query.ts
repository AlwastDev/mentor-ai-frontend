import { DESKTOP_PAGE_SIZE } from "@/shared/utils/constants";
import { trpc } from "@/shared/utils/trpc";

export const useGetAllTestsQuery = (page: number) => {
	const { data, isLoading, refetch } = trpc.test.getAllTests.useQuery({
		page,
		limit: DESKTOP_PAGE_SIZE,
	});

	const tests = data?.items ?? [];
	const total = data?.totalCount ?? 0;

	return { tests, total, isLoading, refetch };
};
