import React from "react";

import { cn } from "@/shared/utils/helpers";

type ButtonProps = {
	color?: "blue" | "white";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { className, type, disabled, children, onClick, color = "blue" } = props;

	const blue = "bg-[#1CB0F6] shadow-blue hover:shadow-none text-white";
	const white =
		"bg-white border-2 border-[#E5E5E5] shadow-darkWhite hover:shadow-none text-[#1CB0F6]";

	return (
		<button
			type={type}
			ref={ref}
			disabled={disabled}
			className={cn(
				"flex items-center justify-center py-[14px] px-2",
				"rounded-2xl",
				"text-center text-sm font-bold uppercase tracking-[0.8px]",
				"transition-all duration-300 ease-in-out",
				{
					"cursor-not-allowed bg-gray-300": disabled,
					"cursor-pointer": !disabled,
					[blue]: color === "blue" && !disabled,
					[white]: color === "white" && !disabled,
				},
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
});

Button.displayName = "Button";
