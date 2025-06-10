import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, ControlledInput, ControlledTextarea, Icon } from "@/shared/components/ui";
import { useEditLearningMaterialMutation } from "../hooks";
import type { GetByIdResponse } from "@/server/core/responses/TestService/GetByIdResponse";
import { useNotification } from "@/shared/hooks";

type MaterialsTabProps = {
	testId?: string;
};

export const MaterialsTab = (props: MaterialsTabProps) => {
	const { testId } = props;

	const n = useNotification();
	const { control, getValues, setValue, trigger } = useFormContext<GetByIdResponse>();

	const { editLearningMaterial } = useEditLearningMaterialMutation();

	const {
		fields: materialFields,
		append: appendMaterial,
		remove: removeMaterial,
	} = useFieldArray({
		control,
		name: "materials",
	});

	const addMaterial = () => {
		appendMaterial({ id: "", title: "", content: "" });
	};

	const onSaveMaterials = async () => {
		if (!testId) {
			return;
		}

		const isValid = await trigger("materials");
		if (!isValid) {
			n.error("Будь ласка, заповніть всі поля");
			return;
		}

		const formValues = getValues();

		const updated = await editLearningMaterial({
			testId,
			materials: formValues.materials.map((m) => ({
				learningMaterialId: m.id === "" ? null : m.id,
				title: m.title,
				content: m.content,
			})),
		});

		if (updated?.materials) {
			setValue("materials", updated.materials);
		}
	};

	if (!testId) {
		return <div>Test ID is required</div>;
	}

	return (
		<>
			{materialFields.map((_, i) => (
				<div key={`material-${i}`} className="flex items-center gap-2">
					<div className="mb-2 flex w-full flex-col gap-2 rounded border p-3">
						<ControlledInput
							name={`materials.${i}.title`}
							placeholder="Назва матеріалу"
						/>
						<ControlledTextarea
							name={`materials.${i}.content`}
							placeholder="Контент матеріалу"
							features={{
								image: true,
								code: true,
								preview: true,
								live: true,
								edit: true,
							}}
						/>
					</div>
					<Icon icon="cross" onClick={() => removeMaterial(i)} />
				</div>
			))}

			<Button type="button" onClick={addMaterial} className="mt-4">
				Додати матеріал
			</Button>

			<Button type="button" className="ml-4 mt-4" onClick={onSaveMaterials}>
				Зберегти матеріали
			</Button>
		</>
	);
};
