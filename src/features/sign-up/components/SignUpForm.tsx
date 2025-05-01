"use client";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNotification } from "@/shared/hooks";
import { Button, ControlledInput, Form } from "@/shared/components/ui";

const signUpInputSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type SignUpInput = z.infer<typeof signUpInputSchema>;

export const SignUpForm = () => {
  const n = useNotification();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpInputSchema),
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
      callbackUrl: window === undefined ? "" : `${window.location.origin}`,
    })
      .then(async (response) => {
        if (!response?.ok && response?.error) {
          n.error(response.error);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("error", error);
      })
  };

  const isDisabled = !isValid;

  return (
    <Form
      form={form}
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto gap-y-2 min-w-[375px]"
    >
      <ControlledInput
        name="name"
        placeholder="Enter your name"
      />
      <ControlledInput
        name="surname"
        placeholder="Enter your surname"
      />
      <ControlledInput
        name="email"
        placeholder="Enter your email"
      />
      <ControlledInput
        name="password"
        type="password"
        placeholder="Enter your password"
      />
      <ControlledInput
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
      />
      <Button disabled={isDisabled} type="submit">
        Create account
      </Button>
    </Form>
  );
};
