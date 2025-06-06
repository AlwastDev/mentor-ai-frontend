import { Button, ControlledInput } from "@/shared/components/ui";

type GeneralTabProps = {
	isDisabledSaveButton: boolean;
	onSaveGeneral: () => void;
};

export const GeneralTab = (props: GeneralTabProps) => {
	const { isDisabledSaveButton, onSaveGeneral } = props;

	return (
		<div className="space-y-4">
			<ControlledInput name="testName" placeholder="Назва тесту" />
			<ControlledInput name="description" placeholder="Опис (необов’язково)" />

			<Button
				disabled={isDisabledSaveButton}
				type="button"
				className="mt-4"
				onClick={onSaveGeneral}
			>
				Зберегти тест
			</Button>
		</div>
	);
};
