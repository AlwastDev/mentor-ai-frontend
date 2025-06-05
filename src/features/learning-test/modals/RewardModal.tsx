"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Coins, Sparkles } from "lucide-react";

import { Button } from "@/shared/components/ui";
import { useModalStore } from "@/shared/store";
import { ROUTES } from "@/shared/utils/routes";
import ModalLayout from "@/shared/layouts/Modal/ModalLayout";

export default function RewardModal() {
	const router = useRouter();
	const { params, closeModal } = useModalStore();

	const reward = params as { coins: number; experience: number; score: number };

	const handleContinue = () => {
		closeModal();
		router.push(ROUTES.Learning.Roadmap);
	};

	return (
		<ModalLayout
			className="w-[27.125rem] bg-white dark:bg-zinc-900 px-8 py-8 text-center"
			closeable={false}
		>
			<motion.div
				initial={{ scale: 0.7, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.7, opacity: 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			>
				<AnimatedCheck />
				<h2 className="mb-4 text-2xl font-bold">Вітаємо з проходженням тесту!</h2>

				<div className="space-y-4 text-lg">
					<div className="flex items-center justify-center gap-2">
						<Coins className="h-6 w-6 text-amber-500" />
						<span className="font-medium">{reward.coins}</span> монет
					</div>
					<div className="flex items-center justify-center gap-2">
						<Sparkles className="h-6 w-6 text-indigo-500" />
						<span className="font-medium">{reward.experience}</span> EXP
					</div>
					<div className="text-sm text-zinc-600 dark:text-zinc-400">
						Результат&nbsp;
						<span className="font-semibold">{reward.score * 100}%</span>
					</div>
				</div>

				<Button className="mt-6 w-full" onClick={handleContinue}>
					Продовжити
				</Button>
			</motion.div>
		</ModalLayout>
	);
}

function AnimatedCheck() {
	const circle = {
		hidden: { pathLength: 0, opacity: 0 },
		visible: { pathLength: 1, opacity: 1 },
	};

	const tick = {
		hidden: { pathLength: 0, opacity: 0 },
		visible: {
			pathLength: 1,
			opacity: 1,
			transition: { delay: 0.15 }, // галочка починає малюватися після кола
		},
	};

	return (
		<motion.svg
			width={56}
			height={56}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			initial="hidden"
			animate="visible"
			className="mx-auto mb-3 text-emerald-500"
		>
			{/* коло */}
			<motion.circle
				cx="12"
				cy="12"
				r="10"
				variants={circle}
				transition={{ duration: 0.6, ease: "easeInOut" }}
			/>
			{/* галочка */}
			<motion.path
				d="M9 12l2 2 4-4"
				variants={tick}
				transition={{ duration: 0.4, ease: "easeInOut" }}
			/>
		</motion.svg>
	);
}
