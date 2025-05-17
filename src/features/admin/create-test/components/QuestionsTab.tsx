import { useFieldArray, useFormContext } from "react-hook-form";

import { Button, ControlledInput } from "@/shared/components/ui";

export const QuestionsTab = () => {
	const { control, register } = useFormContext();

	const { fields: questionFields, append: appendQuestion } = useFieldArray({
		control,
		name: "questions",
	});

	const addQuestion = () => {
		appendQuestion({
			text: "",
			answers: new Array(4).fill({ text: "", isCorrect: false }),
		});
	};

	const onSaveQuestions = () => {
		// отправить AddQuestionCommand по каждой
	};

	return (
		<>
			{questionFields.map((q, i) => (
				<div key={q.id} className="border rounded p-3 mb-4">
					<ControlledInput
						name={`questions.${i}.text`}
						placeholder="Текст питання"
					/>
					{[0, 1, 2, 3].map((j) => (
						<div key={j} className="flex gap-2 items-center mt-2">
							<input
								type="checkbox"
								{...register(`questions.${i}.answers.${j}.isCorrect`)}
							/>
							<ControlledInput
								name={`questions.${i}.answers.${j}.text`}
								placeholder={`Відповідь ${j + 1}`}
							/>
						</div>
					))}
				</div>
			))}

			<Button type="button" onClick={addQuestion} className="mt-4">
				Додати питання
			</Button>

			<Button type="button" className="mt-4 ml-4" onClick={onSaveQuestions}>
				Зберегти питання
			</Button>
		</>
	);
};
