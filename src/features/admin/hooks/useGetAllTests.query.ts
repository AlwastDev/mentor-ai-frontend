import { trpc } from "@/shared/utils/trpc";

export const useGetAllTestsQuery = () => {
  const { data, isLoading, refetch } = trpc.test.getAllTests.useQuery();

	return { tests: data, isLoading, refetch };
};
