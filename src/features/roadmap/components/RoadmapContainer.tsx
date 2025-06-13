"use client";

import { motion } from "framer-motion";

import { useGenerateRoadmapMutation, useGetRoadmapQuery } from "../hooks";
import { RoadmapNode } from "./RoadmapNode";
import { Loader } from "@/shared/components/ui";
import { cn } from "@/shared/utils/helpers";
import { useStartEntryTestAttemptMutation } from "@/features/home/hooks";

export const RoadmapContainer = () => {
	const { roadmapItems, isLoading } = useGetRoadmapQuery();
	const { generateRoadmap, isPending: isPendingRoadmap } =
		useGenerateRoadmapMutation();
	const { startEntryTestAttempt, isPending: isPendingEntryTest } =
		useStartEntryTestAttemptMutation();

	if (isLoading) {
		return <Loader />;
	}

	if (roadmapItems.length === 0) {
		return (
			<div className="mx-auto flex w-fit flex-col items-center gap-16 py-20 text-center">
				<div className="flex flex-col items-center gap-3">
					<p className="max-w-md text-lg text-zinc-600">
						Дорожню карту ще не створено. Натисніть кнопку нижче, і ми
						згенеруємо персональний план навчання.
					</p>

					<motion.button
						type="button"
						disabled={isPendingRoadmap}
						whileTap={{ scale: 0.96 }}
						onClick={() => generateRoadmap()}
						className={cn(
							"relative inline-flex items-center gap-2 rounded-2xl px-8 py-3 text-base font-semibold text-white",
							"focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
							"before:absolute before:inset-0 before:-z-10 before:rounded-2xl",
							"before:bg-[linear-gradient(130deg,#6366F1_0%,#0EA5E9_50%,#6366F1_100%)]",
							"before:bg-[length:200%_100%] before:transition-[background-position] before:duration-500",
							"hover:before:bg-[position:100%_0]",
						)}
						aria-label={
							isPendingRoadmap ? "Генеруємо..." : "Згенерувати roadmap"
						}
					>
						{isPendingRoadmap ? "Генеруємо..." : "Згенерувати roadmap"}
					</motion.button>
				</div>

				<div className="flex flex-col items-center gap-3">
					<p className="max-w-md text-lg text-zinc-600">
						Якщо ви ще не пройшли вступний тест, то спершу вам потрібно пройти
						його.
					</p>

					<motion.button
						type="button"
						disabled={isPendingEntryTest}
						whileTap={{ scale: 0.96 }}
						onClick={() => startEntryTestAttempt()}
						className={cn(
							"relative inline-flex items-center gap-2 rounded-2xl px-8 py-3 text-base font-semibold text-white",
							"focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
							"before:absolute before:inset-0 before:-z-10 before:rounded-2xl",
							"before:bg-[linear-gradient(130deg,#6366F1_0%,#0EA5E9_50%,#6366F1_100%)]",
							"before:bg-[length:200%_100%] before:transition-[background-position] before:duration-500",
							"hover:before:bg-[position:100%_0]",
						)}
						aria-label={
							isPendingEntryTest ? "Завантажуємо..." : "Пройти вступний тест"
						}
					>
						{isPendingEntryTest ? "Завантажуємо..." : "Пройти вступний тест"}
					</motion.button>
				</div>
			</div>
		);
	}

	const currentIndex = roadmapItems.findIndex((x) => !x.completedDate);

	return (
		<div className="relative mx-auto w-fit py-10">
			<ul className="flex flex-col gap-14">
				{roadmapItems.map((node, idx) => {
					const isDone = !!node.completedDate;
					const isLocked = idx > currentIndex;

					return (
						<li key={node.id} className="relative flex justify-center">
							<RoadmapNode
								state={isDone ? "done" : isLocked ? "locked" : "current"}
								{...node}
							/>

							{idx < roadmapItems.length - 1 && (
								<motion.div
									initial={{ scaleY: 0 }}
									animate={{ scaleY: 1 }}
									transition={{ duration: 0.4, delay: idx * 0.05 }}
									className="absolute left-1/2 top-full h-14 w-px origin-top -translate-x-1/2 bg-slate-300"
								/>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
