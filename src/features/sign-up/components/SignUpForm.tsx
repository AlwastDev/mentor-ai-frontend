"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth, useNotification } from "@/shared/hooks";
import { Button, ControlledInput, Form } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";

export const signUpInputSchema = z
	.object({
		name: z.string().min(1, "Імʼя обовʼязкове"),
		surname: z.string().min(1, "Прізвище обовʼязкове"),
		email: z.string().email("Некоректний email"),
		password: z
			.string()
			.min(8, "Пароль має містити щонайменше 8 символів")
			.regex(/[A-Z]/, "Пароль повинен містити хоча б одну велику літеру")
			.regex(/[a-z]/, "Пароль повинен містити хоча б одну малу літеру")
			.regex(/[0-9]/, "Пароль повинен містити хоча б одну цифру")
			.regex(/[^A-Za-z0-9]/, "Пароль повинен містити хоча б один спецсимвол"),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Паролі не співпадають",
		path: ["confirmPassword"],
	});

type SignUpInput = z.infer<typeof signUpInputSchema>;

export const SignUpForm = () => {
	const { refetch } = useAuth();
	const router = useRouter();
	const n = useNotification();
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpInputSchema),
		mode: "onChange",
	});

	const {
		formState: { isValid },
	} = form;

	const handleSubmit = useCallback(
		async (data: SignUpInput) => {
			if (data.password !== data.confirmPassword) {
				n.error("Passwords do not match");
				return;
			}

			try {
				const res = await fetch("/api/auth/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});

				if (!res.ok) {
					const { message } = await res.json();
					n.error(message || "Помилка реєстрації");
					return;
				}

				refetch();
				router.push(ROUTES.Home);
			} catch (err: any) {
				console.log(err);
				n.error("Помилка з'єднання з сервером");
			}
		},
		[n, refetch, router],
	);

	const isDisabled = !isValid;

	return (
		<Form
			form={form}
			onSubmit={handleSubmit}
			className="mx-auto flex min-w-[375px] flex-col gap-y-2"
		>
			<ControlledInput name="name" placeholder="Імʼя" />
			<ControlledInput name="surname" placeholder="Прізвище" />
			<ControlledInput name="email" placeholder="Email" />
			<ControlledInput name="password" type="password" placeholder="Пароль" />
			<ControlledInput
				name="confirmPassword"
				type="password"
				placeholder="Підтвердіть пароль"
			/>
			<Button disabled={isDisabled} type="submit">
				Створити профіль
			</Button>
		</Form>
	);
};
