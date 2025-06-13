"use client";

import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, ControlledInput, Button } from "@/shared/components/ui";
import { useNotification } from "@/shared/hooks";

const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(8, "Поточний пароль обовʼязковий"),
		newPassword: z
			.string()
			.min(8, "Новий пароль має містити щонайменше 8 символів")
			.regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру")
			.regex(/[a-z]/, "Пароль повинен містити хоча б одну малу літеру")
			.regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
			.regex(/[^A-Za-z0-9]/, "Пароль повинен містити хоча б один спецсимвол"),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Паролі не співпадають",
		path: ["confirmPassword"],
	});

type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
	const n = useNotification();

	const form = useForm<ChangePasswordInput>({
		resolver: zodResolver(changePasswordSchema),
		mode: "onChange",
	});

	const {
		formState: { isValid },
	} = form;

	const handleSubmit = useCallback(
		async (data: ChangePasswordInput) => {
			const res = await fetch("/api/auth/change-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				n.error(res.statusText || "Не вдалося змінити пароль");
				return;
			}

			n.success("Пароль успішно змінено");
			form.reset();
		},
		[n, form],
	);

	return (
		<section className="mx-auto max-w-md space-y-6">
			<h1 className="text-3xl font-bold">Змінити пароль</h1>

			<Form form={form} onSubmit={handleSubmit} className="space-y-3">
				<ControlledInput
					name="currentPassword"
					type="password"
					placeholder="Поточний пароль"
				/>
				<ControlledInput
					name="newPassword"
					type="password"
					placeholder="Новий пароль"
				/>
				<ControlledInput
					name="confirmPassword"
					type="password"
					placeholder="Підтвердіть новий пароль"
				/>
				<Button disabled={!isValid} type="submit">
					Зберегти
				</Button>
			</Form>
		</section>
	);
}
