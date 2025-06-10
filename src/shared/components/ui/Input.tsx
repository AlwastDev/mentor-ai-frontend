"use client";
import React, { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";

import { cn } from "@/shared/utils/helpers";

export type InputProps = {
	className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...rest }, ref) => {
		return (
			<input
				ref={ref}
				autoComplete="off"
				className={cn(
					"focus:outline-none focus:ring-0 focus-visible:outline-none",
					"w-full appearance-none px-[20px] py-[12px]",
					"rounded-2xl border-2",
					"placeholder:text-base placeholder:font-medium placeholder:text-[#AFAFAF]",
					"bg-[#F7F7F7]",
					rest["aria-invalid"] === "true"
						? "border-red-500"
						: "border-[#E5E5E5]",
					className,
				)}
				{...rest}
			/>
		);
	},
);

Input.displayName = "Input";

type ControlledInputProps = InputProps & {
	name: string;
};

export const ControlledInput = (props: ControlledInputProps) => {
	const { name, value: externalValue, defaultValue, disabled, ...rest } = props;

	const { control, setValue } = useFormContext();

	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue: defaultValue ?? "",
	});

	useEffect(() => {
		if (externalValue !== undefined) {
			const timer = setTimeout(() => {
				setValue(name, externalValue, { shouldValidate: true });
			}, 0);

			return () => clearTimeout(timer);
		}
	}, [setValue, externalValue, name]);

	return (
		<div className="space-y-1">
			<Input {...field} {...rest} disabled={disabled} aria-invalid={!!error} />
			{error && (
				<p className="text-sm font-medium text-red-600">{error.message}</p>
			)}
		</div>
	);
};
