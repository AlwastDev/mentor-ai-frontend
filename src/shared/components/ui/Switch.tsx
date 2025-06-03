import { Field, Switch as HeadlessSwitch, Label } from "@headlessui/react";

import { cn } from "@/shared/utils/helpers";

type SwitchProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	wrapperClassName?: string;
	className?: string;
	labelClassName?: string;
	label: string;
};

export const Switch = (props: SwitchProps) => {
	const { checked, onChange, className, label, labelClassName, wrapperClassName } = props;

	return (
		<Field as="div" className={cn("flex items-center justify-between", wrapperClassName)}>
			<Label className={labelClassName}>{label}</Label>
			<HeadlessSwitch
				checked={checked}
				onChange={onChange}
				className={cn(
					"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition",
					checked ? "bg-blue-600" : "bg-gray-200",
					className,
				)}
			>
				<span className="sr-only">{label}</span>
				<span
					className={cn(
						"inline-block h-4 w-4 transform rounded-full bg-white transition",
						checked ? "translate-x-6" : "translate-x-1",
					)}
				/>
			</HeadlessSwitch>
		</Field>
	);
};
