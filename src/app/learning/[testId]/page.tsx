"use client";
import { use } from "react";
import { notFound } from "next/navigation";

import { StartTestButton } from "@/features/material/components";
import { useGetPublishedByTestIdQuery } from "@/features/material/hooks";

type Props = { params: Promise<{ testId: string }> };

export default function MaterialPage({ params }: Props) {
	const { testId } = use(params);

	const { materials, isLoading } = useGetPublishedByTestIdQuery(testId);

	if (materials.length === 0 && !isLoading) {
		notFound();
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
			{materials.map((material) => (
				<div key={material.id}>
					<h1 className="text-3xl font-bold">{material.title}</h1>
					<article
						className="prose max-w-none dark:prose-invert"
						dangerouslySetInnerHTML={{ __html: material.content }}
					/>
				</div>
			))}

			<StartTestButton testId={testId} />
		</div>
	);
}
