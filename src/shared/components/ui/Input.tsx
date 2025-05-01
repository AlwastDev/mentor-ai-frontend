"use client";
import React, { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";

import { cn } from "@/shared/utils/helpers";

export type InputProps = {
	className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		const { className, ...rest } = props;

		return (
			<>
				<input
					ref={ref}
					autoComplete="off"
					className={cn(
						"focus:outline-none focus:ring-0 focus-visible:outline-none",
						"appearance-none w-full py-[12px] px-[20px]",
						"rounded-2xl border-2 border-[#E5E5E5] bg-[#F7F7F7]",
						"placeholder:text-[#AFAFAF] placeholder:text-base placeholder:font-medium",
						className
					)}
					{...rest}
				/>
			</>
		);
	}
);

Input.displayName = "Input";

type ControlledInputProps = InputProps & {
	name: string;
};

export const ControlledInput = (props: ControlledInputProps) => {
	const { name, value: externalValue, defaultValue, disabled, ...rest } = props;

	const { control, setValue } = useFormContext();
	const { field } = useController({
		name,
		control,
		defaultValue: defaultValue ?? "",
	});

	const { ...restField } = field;

	useEffect(() => {
		const timer = setTimeout(() => {
			if (externalValue) {
				setValue(name, externalValue, { shouldValidate: true });
			}
		}, 0);

		return () => clearTimeout(timer);
	}, [setValue, externalValue, name]);

	return <Input {...restField} {...rest} disabled={disabled} />;
};

