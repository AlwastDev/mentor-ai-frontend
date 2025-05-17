import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, ControlledInput } from "@/shared/components/ui";

export const MaterialsTab = () => {
	const { control } = useFormContext();

	const { fields: materialFields, append: appendMaterial } = useFieldArray({
		control,
		name: "materials",
	});

	const addMaterial = () => {
		appendMaterial({ title: "" });
	};

	const onSaveMaterials = () => {
		// отправить AddLearningMaterialCommand по каждой
	};

	return (
		<>
			{materialFields.map((m, i) => (
				<div key={m.id} className="border rounded p-3 mb-2">
					<ControlledInput
						name={`materials.${i}.title`}
						placeholder="Назва матеріалу"
					/>
				</div>
			))}

			<Button type="button" onClick={addMaterial} className="mt-4">
				Додати матеріал
			</Button>

			<Button type="button" className="mt-4 ml-4" onClick={onSaveMaterials}>
				Зберегти матеріали
			</Button>
		</>
	);
};
