"use client";

import { useCallback, useEffect, useState } from "react";

import type { GetByIdTestAttemptResponse } from "@/server/core/responses/TestAttemptService/GetByIdTestAttemptResponse";
import { Button } from "@/shared/components/ui";
import { useCompleteTestAttemptMutation } from "../hooks";
import { useAuth } from "@/shared/hooks";

type TestRunnerProps = { testAttempt: GetByIdTestAttemptResponse };

export function TestRunner(props: TestRunnerProps) {
	const { testAttempt } = props;

	const { userId } = useAuth();

	const storageKey = `test-${testAttempt.testId}-answers`;

	const { completeTestAttempt, isPending } =
		useCompleteTestAttemptMutation(storageKey);

	const [isLoaded, setIsLoaded] = useState(false);
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState<Record<string, string>>({});

	useEffect(() => {
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				setAnswers(JSON.parse(saved));
			} catch (e) {
				console.error("Failed to parse saved answers:", e);
			}
		}
		setIsLoaded(true);
	}, [storageKey]);

	useEffect(() => {
		if (!isLoaded) return;
		localStorage.setItem(storageKey, JSON.stringify(answers));
	}, [answers, isLoaded, storageKey]);

	useEffect(() => {
		if (testAttempt.questions.length === 0) return;

		const saved = localStorage.getItem(storageKey);
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				setAnswers(parsed);
			} catch (e) {
				console.error("Failed to parse saved answers:", e);
			}
		}
	}, [storageKey, testAttempt.questions.length]);

	const q = testAttempt.questions[current];
	const answered = !!answers[q.id];

	const go = useCallback(
		(idx: number) => {
			if (idx < 0 || idx >= testAttempt.questions.length) return;
			setCurrent(idx);
		},
		[testAttempt.questions.length],
	);

	const handleComplete = useCallback(() => {
		completeTestAttempt({
			studentId: userId,
			testAttemptId: testAttempt.id,
			answers: Object.entries(answers).map(([questionId, answerId]) => ({
				questionId,
				answerId,
			})),
		});
	}, [answers, completeTestAttempt, testAttempt.id, userId]);

	return (
		<div className="flex flex-col gap-8">
			<aside className="grid max-w-[600px] grid-cols-10 gap-2">
				{testAttempt.questions.map((_, i) => {
					const isDone = !!answers[testAttempt.questions[i].id];
					const isActive = i === current;
					return (
						<button
							key={i}
							onClick={() => go(i)}
							className={`h-10 w-10 rounded-full border text-sm font-medium transition ${isActive ? "border-sky-600 bg-sky-100 dark:bg-sky-800" : ""} ${isDone ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-800" : ""} `}
						>
							{i + 1}
						</button>
					);
				})}
			</aside>

			<section className="flex-1 space-y-6">
				<div>
					<div
						className="prose mb-4 text-lg font-semibold markdown"
						dangerouslySetInnerHTML={{
							__html: `${current + 1}/${testAttempt.questions.length}. ${q.questionText}`,
						}}
					/>

					<ul className="space-y-3">
						{q.answers.map((a) => (
							<li key={a.id}>
								<label className="flex cursor-pointer items-start gap-3">
									<input
										type="radio"
										name={q.id}
										className="mt-1 h-4 w-4 cursor-pointer accent-sky-600"
										checked={answers[q.id] === a.id}
										onChange={() =>
											setAnswers((prev) => ({ ...prev, [q.id]: a.id }))
										}
									/>
									<div
										className="prose markdown"
										dangerouslySetInnerHTML={{
											__html: a.answerText,
										}}
									/>
								</label>
							</li>
						))}
					</ul>
				</div>

				<div className="flex items-center justify-between">
					<Button onClick={() => go(current - 1)} disabled={current === 0}>
						Назад
					</Button>

					{current < testAttempt.questions.length - 1 ? (
						<Button onClick={() => go(current + 1)} disabled={!answered}>
							Вперед
						</Button>
					) : (
						<Button
							onClick={handleComplete}
							disabled={
								Object.keys(answers).length < testAttempt.questions.length ||
								isPending
							}
						>
							Завершити
						</Button>
					)}
				</div>
			</section>
		</div>
	);
}
