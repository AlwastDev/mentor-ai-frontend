import { type FunctionComponent, type SVGProps, memo } from "react";

import { cn } from "@/shared/utils/helpers";

import { icons } from "@/assets/icons";

export type IconProp = keyof typeof icons;

type IconProps = {
	icon: IconProp;
	className?: string;
	onClick?: () => void;
};

export const Icon = memo((props: IconProps) => {
	const { icon, className = "size-6", onClick } = props;

	const IconComponent: FunctionComponent<SVGProps<SVGElement>> = icons[icon];

	return (
		<IconComponent
			className={cn(className, onClick && "cursor-pointer")}
			onClick={onClick}
		/>
	);
});

Icon.displayName = "Icon";
