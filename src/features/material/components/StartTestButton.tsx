"use client";
import { useCallback } from "react";

import { Button } from "@/shared/components/ui";
import { useAuth } from "@/shared/hooks";
import { useStartTestAttemptMutation } from "@/features/roadmap/hooks";

type StartTestButtonProps = {
	testId: string;
};

export const StartTestButton = (props: StartTestButtonProps) => {
	const { testId } = props;

	const { userId } = useAuth();

	const { startTestAttempt, isPending } = useStartTestAttemptMutation();

	const handleStartTest = useCallback(() => {
		startTestAttempt({
			studentId: userId,
			testId: testId,
		});
	}, [testId, startTestAttempt, userId]);

	return (
		<>
			<Button
				disabled={isPending}
				className="mx-auto"
				onClick={handleStartTest}
			>
				Почати тест
			</Button>
		</>
	);
};
