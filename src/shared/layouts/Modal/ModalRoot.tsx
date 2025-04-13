"use client";
import { memo, Suspense } from "react";

import { useModalStore } from "@/shared/store";

const modalComponents = {
	// SelectTokenModal: dynamic(() =>
	// 	import("@/features/swap/modals/SelectTokenModal").then((mod) => ({
	// 		default: mod.SelectTokenModal,
	// 	}))
	// ),
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
