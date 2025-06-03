import { useFormContext } from "react-hook-form";

import { Button, ControlledInput } from "@/shared/components/ui";
import { Switch } from "@/shared/components/ui/Switch";

type GeneralTabProps = {
	isDisabledSaveButton: boolean;
	onSaveGeneral: () => void;
};

export const GeneralTab = (props: GeneralTabProps) => {
	const { isDisabledSaveButton, onSaveGeneral } = props;

	const { watch, setValue } = useFormContext();

	const isEntryTest = watch("isEntryTest");

	const changeIsEntryTest = (val: boolean) => {
		setValue("isEntryTest", val);
	};

	return (
		<div className="space-y-4">
			<ControlledInput name="testName" placeholder="Назва тесту" />
			<ControlledInput name="description" placeholder="Опис (необов’язково)" />

			<Switch
				wrapperClassName="w-fit gap-x-4"
				checked={!!isEntryTest}
				onChange={changeIsEntryTest}
				label="Вступний тест"
			/>

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
