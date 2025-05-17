"use client";
/* eslint-disable react/display-name */
import { forwardRef, Fragment, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { useController, useFormContext } from "react-hook-form";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";

import { cn } from "@/shared/utils/helpers";
import { Icon, type IconProp } from "./Icon";

export type SelectOption<T> = {
	label: string | null;
	value: T;
	icon?: string | ReactNode;
};

type SelectProps<T> = {
	disabled?: boolean;
	defaultValue?: SelectOption<T>;
	className?: string;
	classNameOptions?: string;
	classNameArrowIcon?: string;
	options: SelectOption<T>[];
	value: SelectOption<T> | null;
	placeholder?: string;
	onChange?: (value: SelectOption<T>) => void;
	arrowIcon?: IconProp;
	startAdornment?: React.ReactNode;
};

const withSelect = <T,>() =>
	forwardRef<HTMLDivElement, SelectProps<T>>((props, ref) => {
		const {
			disabled,
			className,
			classNameOptions,
			classNameArrowIcon,
			options,
			value,
			placeholder,
			onChange,
			arrowIcon = "arrow_bold_down",
			startAdornment,
		} = props;

		return (
			<Listbox disabled={disabled} ref={ref} value={value} onChange={onChange}>
				<div className="relative">
					<ListboxButton
						className={cn(
							"flex items-center gap-x-[10px] rounded-xl min-w-fit",
							"py-[7px] pr-[7px] pl-[15px]",
							"border border-white-7 bg-[#242424]",
							"text-base text-white text-center font-semibold leading-6",
							className,
						)}
					>
						{({ open }) => (
							<>
								{value?.icon ? (
									<>
										{typeof value.icon === "string" ? (
											<Image
												loading="lazy"
												className="size-5 rounded-full"
												src={value.icon}
												width={20}
												height={20}
												alt="icon"
											/>
										) : (
											value.icon
										)}
									</>
								) : (
									<>{!value?.value && startAdornment}</>
								)}

								{value?.label ?? placeholder}

								<Icon
									icon={arrowIcon}
									className={cn(
										"w-5 h-[15px] shrink-0 text-dusty-gray",
										{
											"rotate-180 transition delay-150 ease-in-out": open && !disabled,
											"rotate-0 transition delay-150 ease-in-out": !open && !disabled,
										},
										classNameArrowIcon,
									)}
								/>
							</>
						)}
					</ListboxButton>
					{!disabled && (
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<ListboxOptions
								className={cn(
									"absolute left-0 top-11 z-20 max-h-60 w-full overflow-auto rounded-lg bg-white-7 px-1 py-2",
									"text-base text-white focus:outline-none",
									"flex flex-col gap-y-3",
									classNameOptions,
								)}
							>
								{options.map((option, index) => (
									<div className="flex flex-col" key={`${index}_option`}>
										<ListboxOption
											value={option}
											className={cn(
												"group flex cursor-pointer items-center gap-x-2 rounded-sm p-1",
												"data-[selected]:bg-white-12",
											)}
										>
											{option.icon && (
												<>
													{typeof option.icon === "string" ? (
														<Image
															loading="lazy"
															className="size-6 rounded-full"
															src={option.icon}
															width={24}
															height={24}
															alt="icon"
														/>
													) : (
														option.icon
													)}
												</>
											)}
											{option.label}
										</ListboxOption>
									</div>
								))}
							</ListboxOptions>
						</Transition>
					)}
				</div>
			</Listbox>
		);
	});

export const Select = <T,>(props: SelectProps<T>) => {
	const Component = withSelect<T>();
	return <Component {...props} />;
};

Select.displayName = "Select";

type ControlledSelectProps<T> = Omit<SelectProps<T>, "value"> & {
	name: string;
	disabled?: boolean;
	value?: SelectOption<T> | undefined;
};

export const ControlledSelect = <T,>(props: ControlledSelectProps<T>) => {
	const { name, onChange, defaultValue, value: externalValue, disabled, ...rest } = props;

	const { control, setValue } = useFormContext();
	const { field } = useController({
		name,
		control,
		defaultValue: defaultValue ?? null,
	});

	useEffect(() => {
		// if (!!onChange) return;

		const timer = setTimeout(() => {
			if (externalValue) {
				setValue(name, externalValue, {
					shouldValidate: true,
				});
			}
		}, 0);

		return () => clearTimeout(timer);
	}, [setValue, externalValue, name, onChange]);

	const { onChange: controlOnChange, ...restField } = field;

	const handleOnChange = (value: SelectOption<T>) => {
		if (disabled) return;
		controlOnChange(value);
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		typeof onChange === "function" && onChange(value);
	};

	return (
		<Select
			{...restField}
			{...rest}
			disabled={disabled}
			value={field.value}
			onChange={handleOnChange}
		/>
	);
};

ControlledSelect.displayName = "ControlledSelect";
