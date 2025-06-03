"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInInputSchema, type SignInInput } from "../schemas/signIn.schema";
import { useAuth, useNotification } from "@/shared/hooks";
import { Button, ControlledInput, Form } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";

export const SignInForm = () => {
	const { refetch } = useAuth();
	const router = useRouter();
	const n = useNotification();
	const form = useForm<SignInInput>({
		resolver: zodResolver(signInInputSchema),
	});

	const {
		formState: { isValid },
	} = form;

	const handleSubmit = useCallback(
		async (data: SignInInput) => {
			try {
				const res = await fetch("/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!res.ok) {
					const { message } = await res.json();
					n.error(message || "Помилка авторизації");
					return;
				}

				refetch();
				router.push(ROUTES.Home);
			} catch (err: any) {
				console.log(err);
				n.error("Помилка з'єднання з сервером");
			}
		},
		[form, n],
	);

	const isDisabled = !isValid;

	return (
		<Form form={form} onSubmit={handleSubmit} className="flex flex-col gap-y-5 min-w-[375px]">
			<div className="flex flex-col gap-y-2">
				<ControlledInput name="email" placeholder="Пошта" />
				<ControlledInput name="password" type="password" placeholder="Пароль" />
			</div>
			<Button disabled={isDisabled} type="submit">
				Вхід
			</Button>
		</Form>
	);
};
