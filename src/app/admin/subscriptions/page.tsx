"use client";
import Link from "next/link";

import { SubscriptionCard } from "@/features/admin/subscriptions/components";
import { useGetSubscriptionsQuery } from "@/features/admin/subscriptions/hooks";
import { Button } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";
import { useAuth } from "@/shared/hooks";

export default function SubscriptionsPage() {
	const { isAdmin, isChecking } = useAuth();
	const { subscriptions, isLoading } = useGetSubscriptionsQuery();

	if (isLoading || isChecking) {
		return (
			<div className="flex h-64 items-center justify-center">
				<span className="animate-pulse text-lg">Завантаження…</span>
			</div>
		);
	}

	if (subscriptions.length === 0) {
		return (
			<div className="flex h-64 flex-col items-center justify-center gap-4">
				<span className="text-lg">Немає планів підписки</span>

				<Link href={ROUTES.Admin.Subscriptions.Create}>
					<Button>Створити план</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-6xl px-4 py-10">
			<div className="flex justify-between items-center">
				<h1 className="mb-8 text-3xl font-bold">Плани підписки</h1>

				{isAdmin && (
					<Link href={ROUTES.Admin.Subscriptions.Create}>
						<Button>Створити план</Button>
					</Link>
				)}
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{subscriptions.map((plan) => (
					<SubscriptionCard key={plan.id} plan={plan} />
				))}
			</div>
		</div>
	);
}
