import { useFormContext } from "react-hook-form";
import { Switch } from "@headlessui/react";

import { Button, ControlledInput } from "@/shared/components/ui";
import { cn } from "@/shared/utils/helpers";

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

			<div className="flex items-center gap-4">
				<label className="text-sm">Вступний тест</label>
				<Switch
					checked={!!isEntryTest}
					onChange={changeIsEntryTest}
					className={cn(
						"relative inline-flex h-6 w-11 items-center rounded-full",
						isEntryTest ? "bg-blue-600" : "bg-gray-200",
					)}
				>
					<span className="sr-only">Toggle Entry Test</span>
					<span
						className={cn(
							"inline-block h-4 w-4 transform rounded-full bg-white transition",
							isEntryTest ? "translate-x-6" : "translate-x-1",
						)}
					/>
				</Switch>
			</div>

			<Button disabled={isDisabledSaveButton} type="button" className="mt-4" onClick={onSaveGeneral}>
				Зберегти тест
			</Button>
		</div>
	);
};
