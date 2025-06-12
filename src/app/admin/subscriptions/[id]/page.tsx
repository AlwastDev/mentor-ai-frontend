"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { useEditSubscriptionMutation } from "@/features/admin/create-subscription/hooks";
import { useGetSubscriptionsQuery } from "@/features/admin/subscriptions/hooks";
import { editSubscriptionSchema, type EditSubscriptionSchema } from "@/server/core/schemas/SubscriptionService/createSubscription.schema";
import { Button, ControlledInput, Form, Switch } from "@/shared/components/ui";

export default function EditSubscriptionPage() {
	const { id } = useParams();
	const { subscriptions } = useGetSubscriptionsQuery();
	const { editSubscription, isPending } = useEditSubscriptionMutation();

  const subscription = subscriptions.find((s) => s.id === id);

	const form = useForm<EditSubscriptionSchema>({
		resolver: zodResolver(editSubscriptionSchema),
		defaultValues: {
      planId: "",
			planName: "",
			price: 0,
			durationDays: 30,
			accessToCharts: true,
			accessToAISupportChat: false,
			bonusCoins: 0,
		},
	});

	const { watch, setValue, register } = form;

  useEffect(() => {
    if(subscription) {
      form.reset({
        planId: subscription.id,
        planName: subscription.planName,
        price: subscription.price,
        durationDays: subscription.durationDays,
        accessToCharts: subscription.accessToCharts,
        accessToAISupportChat: subscription.accessToAISupportChat,
        bonusCoins: subscription.bonusCoins,
      });
    }
  }, [form, subscription]);

  const onSubmit = (data: EditSubscriptionSchema) => {
    if(!subscription) return;

		editSubscription({ ...data, planId: subscription.id });
	};

	if (!subscription) {
		return notFound();
	}

	return (
		<div className="container mx-auto max-w-lg px-4 py-10">
			<h1 className="mb-8 text-3xl font-bold">Редагування підписки</h1>

			<Form
				onSubmit={onSubmit}
				form={form}
				className="space-y-6 rounded-2xl border bg-white p-8 shadow-lg"
			>
				<div>
					<label className="mb-1 block font-medium">Назва плану</label>
					<ControlledInput name="planName" placeholder="Назва плану" />
				</div>
				<div>
					<label className="mb-1 block font-medium">Ціна, грн</label>
					<ControlledInput
						{...register("price", { valueAsNumber: true })}
						type="number"
						name="price"
						placeholder="Ціна"
						step="0.01"
					/>
				</div>

				<div>
					<label className="mb-1 block font-medium">Тривалість, днів</label>
					<ControlledInput
						{...register("durationDays", { valueAsNumber: true })}
						name="durationDays"
						placeholder="Тривалість"
						type="number"
					/>
				</div>

				<Switch
					labelClassName="font-medium"
					label="Доступ до графіків"
					checked={watch("accessToCharts")}
					onChange={(v) => setValue("accessToCharts", v)}
				/>

				<Switch
					labelClassName="font-medium"
					label="AI-чат підтримки"
					checked={watch("accessToAISupportChat")}
					onChange={(v) => setValue("accessToAISupportChat", v)}
				/>

				<div>
					<label className="mb-1 block font-medium">Бонусні монети</label>
					<ControlledInput
						{...register("bonusCoins", { valueAsNumber: true })}
						name="bonusCoins"
						placeholder="Бонусні монети"
						type="number"
					/>
				</div>

				<Button className="w-full" type="submit" disabled={isPending}>
					{isPending ? "Збереження…" : "Зберегти"}
				</Button>
			</Form>
		</div>
	);
}
