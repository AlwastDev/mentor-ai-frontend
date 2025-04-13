import React from "react";

import { cn } from "@/shared/utils/helpers";

type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { className, type, disabled, children, onClick } = props;

		return (
			<button
				type={type}
				ref={ref}
				disabled={disabled}
				className={cn(
					"flex items-center justify-center",
					{
						"bg-[#848D98] cursor-not-allowed": disabled,
						"cursor-pointer": !disabled,
					},
					className
				)}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";
