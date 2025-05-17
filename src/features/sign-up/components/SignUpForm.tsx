"use client";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNotification } from "@/shared/hooks";
import { Button, ControlledInput, Form } from "@/shared/components/ui";

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
	const n = useNotification();
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpInputSchema),
		mode: "onChange",
	});

	const {
		formState: { isValid },
	} = form;

	const handleSubmit = (data: SignUpInput) => {
		if (data.password !== data.confirmPassword) {
			n.error("Passwords do not match");
			return;
		}

		signIn("sign-up", {
			redirect: false,
			email: data.email,
			password: data.password,
			name: data.name,
			surname: data.surname,
			callbackUrl: window === undefined ? "" : `/`,
		})
			.then(async (response) => {
				if (response?.ok && response.url) {
					window.location.href = response.url;
				} else if (response?.error) {
					n.error(response.error);
				}
			})
			.catch((error) => {
				// eslint-disable-next-line no-console
				console.error("error", error);
			});
	};

	const isDisabled = !isValid;

	return (
		<Form
			form={form}
			onSubmit={handleSubmit}
			className="flex flex-col mx-auto gap-y-2 min-w-[375px]"
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
