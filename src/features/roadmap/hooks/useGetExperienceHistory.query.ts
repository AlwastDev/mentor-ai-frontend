import { trpc } from "@/shared/utils/trpc";

type GetExperienceHistoryQueryProps = {
	enabled: boolean;
};

export function useGetExperienceHistoryQuery(props: GetExperienceHistoryQueryProps) {
	const { enabled } = props;

	const { data, isLoading } = trpc.studentReward.getHistory.useQuery(undefined, {
		enabled,
	});

	const experienceHistory = data ?? [];

	return { experienceHistory, isLoading };
}