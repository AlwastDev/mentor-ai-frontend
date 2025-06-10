import { trpc } from "@/shared/utils/trpc";

export const useGetRoadmapQuery = () => {
	const { data, isLoading } = trpc.roadmap.get.useQuery();

	const roadmapItems = data || [];

	return { roadmapItems, isLoading };
};
