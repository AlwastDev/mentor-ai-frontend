import Link from "next/link";
import { motion } from "framer-motion";

import type { SubscriptionResponse } from "@/server/core/responses/SubscriptionService/GetAllSubscriptionsResponse";
import { Button } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";
import { useDeleteSubscriptionMutation } from "../../create-subscription/hooks";

type SubscriptionCardProps = {
	plan: SubscriptionResponse;
};

export const SubscriptionCard = (props: SubscriptionCardProps) => {
	const { plan } = props;

	const { deleteSubscription, isPending } = useDeleteSubscriptionMutation();

	const handleDelete = async () => {
		await deleteSubscription({ id: plan.id });
	};

	const feature = (label: string, enabled: boolean) => (
		<li className="flex items-start gap-2">
			<span className="text-xl leading-none">{enabled ? "✓" : "✕"}</span>
			<span className={enabled ? "" : "line-through opacity-50"}>{label}</span>
		</li>
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className="flex flex-col rounded-2xl border bg-white p-6 shadow-md"
		>
			<header className="mb-4 flex flex-col gap-1">
				<h2 className="text-2xl font-semibold">{plan.planName}</h2>
				<p className="text-4xl font-bold">{plan.price.toFixed(2)} грн</p>
				<p className="text-sm text-slate-500">
					{plan.durationDays} днів
				</p>
			</header>

			<ul className="mb-6 space-y-2 text-sm leading-relaxed">
				{feature("Доступ до графіків", plan.accessToCharts)}
				{feature("AI-чат підтримки", plan.accessToAISupportChat)}
				{feature(`Бонусні монети: ${plan.bonusCoins}`, plan.bonusCoins > 0)}
			</ul>

			<div className="flex gap-2">
				<Link href={ROUTES.Admin.Subscriptions.Edit(plan.id)}>
					<Button className="w-full" type="button">
						Редагувати
					</Button>
				</Link>

				<Button
					color="white"
					onClick={handleDelete}
					disabled={isPending}
					className="w-full"
					type="button"
				>
					Видалити
				</Button>
			</div>
		</motion.div>
	);
};
