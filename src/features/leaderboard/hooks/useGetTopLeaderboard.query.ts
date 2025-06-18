import { trpc } from "@/shared/utils/trpc";

export const useGetTopLeaderboardQuery = () => {
	const { data, isLoading, error } = trpc.leaderboard.getTop.useQuery();

	const topLeaderboard = data ?? [];

	return { topLeaderboard, isLoading, error };
};