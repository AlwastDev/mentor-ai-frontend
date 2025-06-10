import { trpc } from "@/shared/utils/trpc";

export const useGetSubscriptionsQuery = () => {
	const { data, isLoading, refetch } = trpc.subscription.getAll.useQuery();

	const subscriptions = data?.plans || [];

	return { subscriptions, isLoading, refetch };
};
