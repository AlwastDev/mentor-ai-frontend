"use client";
import { Button } from "@/shared/components/ui";
import ModalLayout from "@/shared/layouts/Modal/ModalLayout";
import { useModalStore } from "@/shared/store";

interface ConfirmationModalParams {
	title?: string;
	text?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void | Promise<void>;
}

export default function ConfirmationModal() {
	const { params, closeModal } = useModalStore();

	const {
		title = "Confirmation",
		text = "Are you sure you want to proceed?",
		confirmText = "Confirm",
		cancelText = "Cancel",
		onConfirm,
	} = (params ?? {}) as ConfirmationModalParams;

	const handleCancel = () => {
		closeModal();
	};

	const handleConfirm = async () => {
		if (onConfirm) await onConfirm();
		closeModal();
	};

	return (
		<ModalLayout
			showCloseButton={false}
			title={title}
			className="w-[27.125rem] px-8 py-8 text-center"
		>
			<p className="mb-6 text-base leading-relaxed text-zinc-700">{text}</p>
			<div className="flex gap-4">
				<Button color="white" className="w-full" onClick={handleCancel}>
					{cancelText}
				</Button>
				<Button className="w-full" onClick={handleConfirm}>
					{confirmText}
				</Button>
			</div>
		</ModalLayout>
	);
}
