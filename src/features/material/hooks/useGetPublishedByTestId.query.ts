import { trpc } from "@/shared/utils/trpc";

export const useGetPublishedByTestIdQuery = (id: string) => {
  const { data, isLoading, error } = trpc.learningMaterial.getPublishedByTestId.useQuery(id);

  const materials = data?.materials || [];

  return { materials, isLoading, error };
};