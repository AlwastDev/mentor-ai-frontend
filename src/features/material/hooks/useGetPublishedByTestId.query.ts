import { useMemo } from "react";

import { trpc } from "@/shared/utils/trpc";

export const useGetPublishedByTestIdQuery = (id: string) => {
	const { data, error, isLoading } =
		trpc.learningMaterial.getPublishedByTestId.useQuery(id);

	const materials = useMemo(() => data?.materials ?? [], [data]);

	return { materials, error, isLoading };
};
