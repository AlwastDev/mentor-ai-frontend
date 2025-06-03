"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateSubscriptionMutation } from "@/features/admin/create-subscription/hooks";
import {
	createSubscriptionSchema,
	type CreateSubscriptionSchema,
} from "@/server/core/schemas/SubscriptionService/createSubscription.schema";
import { Button, ControlledInput, Form } from "@/shared/components/ui";
import { Switch } from "@/shared/components/ui/Switch";

export default function CreateSubscriptionPage() {
	const { createSubscription, isPending } = useCreateSubscriptionMutation();

	const form = useForm<CreateSubscriptionSchema>({
		resolver: zodResolver(createSubscriptionSchema),
		defaultValues: {
			planName: "",
			price: 0,
			durationDays: 30,
			accessToCharts: true,
			accessToAISupportChat: false,
			bonusCoins: 0,
		},
	});

	const { watch, setValue, register } = form;

	const onSubmit = (data: CreateSubscriptionSchema) => {
		createSubscription(data);
	};

	return (
		<div className="container mx-auto max-w-lg px-4 py-10">
			<h1 className="mb-8 text-3xl font-bold">Нова підписка</h1>

			<Form
				onSubmit={onSubmit}
				form={form}
				className="space-y-6 rounded-2xl border bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800"
			>
				<div>
					<label className="mb-1 block font-medium">Назва плану</label>
					<ControlledInput name="planName" placeholder="Назва плану" />
				</div>
				<div>
					<label className="mb-1 block font-medium">Ціна, $</label>
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
					{isPending ? "Збереження…" : "Створити"}
				</Button>
			</Form>
		</div>
	);
}
