"use client";
import { use } from "react";
import { notFound } from "next/navigation";

import { TestRunner } from "@/features/learning-test/components";
import { useGetTestAttemptByIdQuery } from "@/features/learning-test/hooks";

type Props = { params: Promise<{ testAttemptId: string }> };

export default function TestAttemptPage({ params }: Props) {
	const { testAttemptId } = use(params);

	const { testAttempt, isLoading } = useGetTestAttemptByIdQuery(testAttemptId);

	if (!testAttempt && !isLoading) {
		notFound();
	}

	if (isLoading || !testAttempt) {
		return <div>Loading...</div>;
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-10">
			<h1 className="mb-2 text-3xl font-bold">{testAttempt.testName}</h1>
			{testAttempt.description && <p className="mb-6 text-lg">{testAttempt.description}</p>}
			<TestRunner testAttempt={testAttempt} />
		</div>
	);
}
