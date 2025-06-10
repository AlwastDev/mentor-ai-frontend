"use client";
import { memo, Suspense } from "react";
import dynamic from "next/dynamic";

import { useModalStore } from "@/shared/store";

const modalComponents = {
	RewardModal: dynamic(() =>
		import("@/features/learning-test/modals/RewardModal").then((mod) => ({
			default: mod.default,
		})),
	),
};

export const ModalRoot = memo(() => {
	const { activeModal } = useModalStore();

	const ModalComponent = activeModal
		? modalComponents[activeModal as keyof typeof modalComponents]
		: null;

	if (!ModalComponent) {
		return null; // or handle the error state
	}

	return (
		<Suspense>
			<ModalComponent key={activeModal} />
		</Suspense>
	);
});

ModalRoot.displayName = "ModalRoot";
