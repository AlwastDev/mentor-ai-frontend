"use client";

import { motion } from "framer-motion";

import { useGetRoadmapQuery } from "../hooks";
import { RoadmapNode } from "./RoadmapNode";
import { Loader } from "@/shared/components/ui/Loader";

export const RoadmapContainer = () => {
	const { roadmapItems, isLoading } = useGetRoadmapQuery();

	if (isLoading) {
		return <Loader />;
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
							<RoadmapNode state={isDone ? "done" : isLocked ? "locked" : "current"} {...node} />

							{idx < roadmapItems.length - 1 && (
								<motion.div
									initial={{ scaleY: 0 }}
									animate={{ scaleY: 1 }}
									transition={{ duration: 0.4, delay: idx * 0.05 }}
									className="absolute left-1/2 top-full h-14 w-px -translate-x-1/2 origin-top bg-slate-300 dark:bg-slate-600"
								/>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
