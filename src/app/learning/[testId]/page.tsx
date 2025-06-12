"use client";
import { use } from "react";
import { notFound } from "next/navigation";

import { ChatWidget, StartTestButton } from "@/features/material/components";
import { useGetPublishedByTestIdQuery } from "@/features/material/hooks";
import { useAuth, useValidateUuid } from "@/shared/hooks";
import { Loader } from "@/shared/components/ui";

type Props = { params: Promise<{ testId: string }> };

export default function MaterialPage({ params }: Props) {
	const { testId } = use(params);

	const { session, isChecking } = useAuth();
	const isValid = useValidateUuid(testId);

	if (!isValid) {
		notFound();
	}

	const { materials, isLoading } = useGetPublishedByTestIdQuery(testId);

	if (materials.length === 0 && !isLoading) {
		notFound();
	}

	if (isLoading || isChecking) {
		return (
			<div className="w-full">
				<Loader />
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
			{session?.accessToAiSupportChat && <ChatWidget testId={testId} />}

			{materials.map((material) => {
				return (
					<div key={material.id}>
						<h1 className="text-3xl font-bold">{material.title}</h1>
						<article
							className="prose markdown max-w-none"
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
