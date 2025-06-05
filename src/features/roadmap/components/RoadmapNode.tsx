import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Star, Lock, CheckCircle2 } from "lucide-react";

import type { GetRoadmapResponse } from "@/server/core/responses/RoadmapService/getRoadmap.response";
import { cn } from "@/shared/utils/helpers";
import { ROUTES } from "@/shared/utils/routes";

type RoadmapNodeProps = {
	state: "done" | "current" | "locked";
} & GetRoadmapResponse;

export const RoadmapNode = (props: RoadmapNodeProps) => {
	const { state, ...item } = props;

	const router = useRouter();

	const variants = {
		done: { bg: "bg-emerald-500", Icon: CheckCircle2 },
		current: { bg: "bg-amber-400", Icon: Star },
		locked: { bg: "bg-slate-400", Icon: Lock },
	} as const;

	const { bg, Icon } = variants[state];

	const handleRedirect = () => {
		if (state === "current") {
			router.push(ROUTES.Learning.Learning(item.testId));
		}
	};

	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			className={cn(
				"relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg",
				bg,
			)}
			onClick={handleRedirect}
			disabled={state === "locked"}
		>
			<Icon className="h-10 w-10" />
			{state === "done" && (
        <CheckCircle2 className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-white p-0.5 text-emerald-500 shadow" />
      )}
		</motion.button>
	);
};
