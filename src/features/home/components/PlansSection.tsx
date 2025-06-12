"use client";
import { motion } from "framer-motion";
import { CheckCircle2, BarChart3, Sparkles, Coins } from "lucide-react";

import { Loader } from "@/shared/components/ui";
import { useGetSubscriptionsQuery } from "@/features/admin/subscriptions/hooks";
import { PayButton } from "@/features/admin/subscriptions/components";

export const PlansSection = () => {
	const { subscriptions, isLoading } = useGetSubscriptionsQuery();

	if (isLoading) return <Loader />;

	return (
		<section className="mx-auto mb-32 max-w-6xl px-6">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="mb-16 text-center text-3xl font-bold sm:text-4xl"
			>
				Тарифні плани
			</motion.h2>

			<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{subscriptions.map((plan, idx) => (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: idx * 0.05 }}
						key={plan.id}
						className="flex flex-col rounded-2xl bg-white p-8 shadow-lg"
					>
						<h3 className="mb-4 text-xl font-semibold">
							{plan.planName}
						</h3>

						<p className="mb-6 text-3xl font-bold">
							{plan.price.toLocaleString("uk-UA", {
								style: "currency",
								currency: "UAH",
							})}
							<span className="ml-1 text-base font-medium text-zinc-500">
								/ {plan.durationDays} дн.
							</span>
						</p>

						<ul className="flex-1 space-y-2 text-sm text-zinc-700">
							<Feature
								active={plan.accessToCharts}
								icon={<BarChart3 className="h-4 w-4" />}
								label="Доступ до аналітики"
							/>
							<Feature
								active={plan.accessToAISupportChat}
								icon={<Sparkles className="h-4 w-4" />}
								label="AI-чат підтримки"
							/>
							<Feature
								active={plan.bonusCoins > 0}
								icon={<Coins className="h-4 w-4" />}
								label={`+${plan.bonusCoins} бонус-монет`}
							/>
						</ul>

						<div className="mt-6">
							<PayButton plan={plan} />
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
};

type FeatureProps = {
	active: boolean;
	icon: React.ReactNode;
	label: string;
};

const Feature = (props: FeatureProps) => {
	const { active, icon, label } = props;

	return (
		<li className="flex items-center gap-2">
			{active ? (
				<CheckCircle2 className="h-4 w-4 text-emerald-500" />
			) : (
				<span className="h-4 w-4 opacity-20">{icon}</span>
			)}
			<span className={active ? "" : "opacity-50"}>{label}</span>
		</li>
	);
};
