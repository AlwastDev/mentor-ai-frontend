"use client";
import { use } from "react";
import { notFound } from "next/navigation";

import { StartTestButton } from "@/features/material/components";
import { useGetPublishedByTestIdQuery } from "@/features/material/hooks";
import { useValidateUuid } from "@/shared/hooks";
import { Loader } from "@/shared/components/ui/Loader";

type Props = { params: Promise<{ testId: string }> };

export default function MaterialPage({ params }: Props) {
	const { testId } = use(params);

	const isValid = useValidateUuid(testId);

	if (!isValid) {
		notFound();
	}

	const { materials, isLoading } = useGetPublishedByTestIdQuery(testId);

	if (materials.length === 0 && !isLoading) {
		notFound();
	}

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
			{materials.map((material) => {
				return (
					<div key={material.id}>
						<h1 className="text-3xl font-bold">{material.title}</h1>
						<article
							className="prose dark:prose-invert max-w-none markdown"
							dangerouslySetInnerHTML={{
								__html: material.content,
							}}
						/>
					</div>
				);
			})}

			<StartTestButton testId={testId} />
		</div>
	);
}
