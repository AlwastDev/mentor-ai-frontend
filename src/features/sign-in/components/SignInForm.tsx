"use client";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { signInInputSchema, type SignInInput } from "../schemas/signIn.schema";
import { useNotification } from "@/shared/hooks";
import { Button, ControlledInput, Form } from "@/shared/components/ui";

export const SignInForm = () => {
	const n = useNotification();
	const form = useForm<SignInInput>({
		resolver: zodResolver(signInInputSchema),
	});

	const {
		formState: { isValid },
	} = form;

	const handleSubmit = useCallback(
		(data: SignInInput) => {
			signIn("sign-in", {
				redirect: false,
				email: data.email,
				password: data.password,
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
