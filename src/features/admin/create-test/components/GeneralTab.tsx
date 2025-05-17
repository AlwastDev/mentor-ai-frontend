import { useFormContext } from "react-hook-form";
import { Switch } from "@headlessui/react";

import { Button, ControlledInput } from "@/shared/components/ui";
import { cn } from "@/shared/utils/helpers";
import { useNotification } from "@/shared/hooks";

export const GeneralTab = () => {
  const n = useNotification();
	const { watch, setValue } = useFormContext();

	const questions = watch("questions");
	const materials = watch("materials");

	const isEntryTest = watch("isEntryTest");

  const canPublish = questions.length > 0 && materials.length > 0;

	const changeIsEntryTest = (val: boolean) => {
		setValue("isEntryTest", val);
	};

	const changeCanPublish = (val: boolean) => {
    if(!canPublish) {
      n.error("Не можна опублікувати тест без питань та матеріалів");
      return;
    }

    if(canPublish && !val) {
      setValue("canPublish", true);
      n.success("Тест успішно опубліковано");
    }
	};

	const onSaveGeneral = () => {
		// отправить AddTestCommand
	};

	return (
		<div className="space-y-4">
			<ControlledInput name="name" placeholder="Назва тесту" />
			<ControlledInput name="description" placeholder="Опис (необов’язково)" />

			<div className="flex items-center gap-4">
				<label className="text-sm">Вступний тест</label>
				<Switch
					checked={isEntryTest}
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

			<div className="flex items-center gap-4">
				<label className="text-sm">Опублікувати</label>
				<Switch
					checked={canPublish}
					onChange={changeCanPublish}
					className={cn(
						"relative inline-flex h-6 w-11 items-center rounded-full",
						canPublish ? "bg-green-600" : "bg-gray-200",
					)}
				>
					<span className="sr-only">Toggle Publish</span>
					<span
						className={cn(
							"inline-block h-4 w-4 transform rounded-full bg-white transition",
							canPublish ? "translate-x-6" : "translate-x-1",
						)}
					/>
				</Switch>
			</div>

			<Button className="mt-4" onClick={onSaveGeneral}>
				Зберегти тест
			</Button>
		</div>
	);
};
