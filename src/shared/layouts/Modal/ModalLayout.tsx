"use client";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/shared/utils/helpers";
import { Icon } from "@/shared/components/ui";
import { useModalStore } from "@/shared/store";
import useWindowSize from "@/shared/hooks/useWindowSize.hook";

type ModalLayoutProps = {
	className?: string;
	titleClassName?: string;
	closeable?: boolean;
	showCloseButton?: boolean;
	title?: string;
	scrollable?: boolean;
} & React.PropsWithChildren;

const ModalLayout = (props: ModalLayoutProps) => {
	const {
		className,
		titleClassName,
		closeable = true,
		showCloseButton = true,
		title,
		children,
		scrollable = false,
	} = props;

	const { closeModal } = useModalStore();
	const { isMobile } = useWindowSize();

	const [isVisible, setIsVisible] = useState(false);

	const handleCloseModal = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			if (closeable) {
				closeModal();
			}
		},
		[closeModal, closeable],
	);

	const handleModalClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
		},
		[],
	);

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 10);
	}, []);

	useEffect(() => {
		if (isVisible) {
			const scrollBarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			document.documentElement.style.overflow = "hidden";
			document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
		} else {
			document.documentElement.style.overflow = "";
			document.documentElement.style.paddingRight = "";
		}

		return () => {
			document.documentElement.style.overflow = "";
			document.documentElement.style.paddingRight = "";
		};
	}, [isVisible]);

	if (isMobile) {
		return (
			<div
				className={cn(
					"fixed inset-0 z-50 flex bg-[rgba(0,0,0,0.60)]",
					"transition-opacity duration-300 ease-in-out",
					{ "opacity-100": isVisible, "opacity-0": !isVisible },
				)}
				onClick={handleCloseModal}
			>
				<div className="fixed bottom-0 left-0 right-0 w-full">
					<div
						className={cn(
							className,
							"bg-white relative w-full transform rounded-t-xl",
							"border-white-7 max-h-[70vh] border-t shadow-lg",
							"transition-all duration-300 ease-in-out",
							{ "overflow-y-auto": scrollable },
							{
								"scale-100 opacity-100": isVisible,
								"scale-95 opacity-0": !isVisible,
							},
						)}
						onClick={handleModalClick}
					>
						<div className={cn("flex justify-between px-5 pt-5")}>
							{title && (
								<h2
									className={cn(
										"text-base font-semibold leading-normal text-zinc-700",
										titleClassName,
									)}
								>
									{title}
								</h2>
							)}

							{closeable && showCloseButton && (
								<Icon
									icon="cross"
									className={cn("size-6")}
									onClick={closeModal}
								/>
							)}
						</div>
						{children}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{ backdropFilter: "blur(1px)" }}
			className={cn(
				"fixed inset-0 z-[70] flex items-center justify-center",
				"transition-opacity duration-300 ease-in-out shadow-lg",
				{ "opacity-100": isVisible, "opacity-0": !isVisible },
			)}
			onClick={handleCloseModal}
		>
			<div
				className={cn(
					"bg-white relative transform rounded-[20px]",
					"border-white-7 border",
					"transition-all duration-300 ease-in-out",
					className,
					{
						"scale-100 opacity-100": isVisible,
						"scale-95 opacity-0": !isVisible,
					},
				)}
				onClick={handleModalClick}
			>
				{(title || closeable) && (
					<div className={cn("flex items-center justify-center pb-5")}>
						{title && (
							<h2
								className={cn(
									"text-xl font-semibold leading-normal text-zinc-700",
									titleClassName,
								)}
							>
								{title}
							</h2>
						)}

						{closeable && showCloseButton && (
							<Icon
								icon="cross"
								className={cn("size-6")}
								onClick={closeModal}
							/>
						)}
					</div>
				)}

				{children}
			</div>
		</div>
	);
};

export default ModalLayout;
