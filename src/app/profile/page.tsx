"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { useAuth } from "@/shared/hooks";
import { Button, Loader } from "@/shared/components/ui";
import { cn } from "@/shared/utils/helpers";
import { useDeleteStudentSubscriptionMutation } from "@/features/profile/hooks";
import { useModalStore } from "@/shared/store";

export default function ProfilePage() {
	const { openModal } = useModalStore();
	const { session, isChecking } = useAuth();
	const { deleteStudentSubscription, isPending } =
		useDeleteStudentSubscriptionMutation();

	if (isChecking) {
		return <Loader />;
	}

	if (!session) {
		return (
			<div className="flex h-64 items-center justify-center">
				<span className="text-lg">Не вдалося отримати дані користувача</span>
			</div>
		);
	}

	const handleUnsubscribe = () => {
		openModal("ConfirmationModal", {
			title: "Відписатися",
			text: "Ви впевнені, що хочете відписатися від підписки?",
			confirmText: "Відписатися",
			cancelText: "Скасувати",
			onConfirm: () => {
				deleteStudentSubscription();
			},
		});
	};

	return (
		<section className="space-y-6">
			<h1 className="text-3xl font-bold">Профіль</h1>

			<div className="space-y-4">
				<InfoRow label="Імʼя" value={session.name ?? "–"} />
				<InfoRow label="Прізвище" value={session.surname ?? "–"} />
				<InfoRow label="Email" value={session.email} />
				<InfoRow label="Статус підписки">
					<div className="flex items-center gap-4">
						{session.hasSubscription && (
							<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-medium text-transparent">
								{session.planName}
							</span>
						)}
						<span
							className={cn(
								session.hasSubscription ? "text-green-600" : "text-red-500",
								"font-medium",
							)}
						>
							{session.hasSubscription ? "Активна" : "Відсутня"}
						</span>
						{session.hasSubscription && (
							<motion.div whileTap={{ scale: 0.95 }}>
								<Button
									disabled={isPending}
									onClick={handleUnsubscribe}
									color="white"
								>
									Відписатися
								</Button>
							</motion.div>
						)}
					</div>
				</InfoRow>
			</div>
		</section>
	);
}

type InfoRowProps = {
	label: string;
	value?: string | ReactNode;
	children?: ReactNode;
};

function InfoRow(props: InfoRowProps) {
	const { label, value, children } = props;

	return (
		<div className="flex items-center justify-between rounded-xl border border-[#E5E5E5] bg-white px-5 py-4 shadow-sm">
			<span className="text-sm text-gray-500">{label}</span>
			{children ?? <span className="font-medium text-gray-800">{value}</span>}
		</div>
	);
}
