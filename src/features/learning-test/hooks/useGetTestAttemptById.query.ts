import { trpc } from "@/shared/utils/trpc";

export const useGetTestAttemptByIdQuery = (id: string) => {
	const { data, isLoading, error } = trpc.testAttempt.getById.useQuery({ id });

	const testAttempt = data;

	return { testAttempt, isLoading, error };
};
