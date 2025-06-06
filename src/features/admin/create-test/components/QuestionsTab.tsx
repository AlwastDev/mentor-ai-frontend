import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, ControlledInput, Icon } from "@/shared/components/ui";
import { useEditQuestionMutation } from "../hooks";
import type { GetByIdResponse } from "@/server/core/responses/TestService/GetByIdResponse";

type QuestionsTabProps = {
	testId?: string;
};

export const QuestionsTab = ({ testId }: QuestionsTabProps) => {
	const { control, getValues, setValue } = useFormContext<GetByIdResponse>();
	const { editQuestion } = useEditQuestionMutation();

	const {
		fields: questionFields,
		append: appendQuestion,
		remove: removeQuestion,
	} = useFieldArray({
		control,
		name: "questions",
	});

	const addQuestion = () => {
		appendQuestion({
			id: "",
			questionText: "",
			answers: Array.from({ length: 3 }, () => ({
				id: "",
				answerText: "",
				isCorrect: false,
			})),
		});
	};

	const onSaveQuestions = async () => {
		if (!testId) return;

		const formValues = getValues();

		const updated = await editQuestion({
			testId,
			questions: formValues.questions.map((q) => ({
				questionId: q.id === "" ? undefined : q.id,
				questionText: q.questionText,
				answers: q.answers.map((a) => ({
					answerId: a.id === "" ? undefined : a.id,
					answerText: a.answerText,
					isCorrect: a.isCorrect,
				})),
			})),
		});

		if (updated?.questions) {
			setValue("questions", updated.questions);
		}
	};

	if (!testId) return <div>Test ID is required</div>;

	return (
		<>
			{questionFields.map((_, i) => {
				return (
					<QuestionItem key={`question-${i}`} index={i} onRemove={() => removeQuestion(i)} />
				);
			})}

			<Button type="button" onClick={addQuestion} className="mt-4">
				Додати питання
			</Button>

			<Button type="button" className="mt-4 ml-4" onClick={onSaveQuestions}>
				Зберегти питання
			</Button>
		</>
	);
};

type QuestionItemProps = {
	index: number;
	onRemove: () => void;
};

const QuestionItem = ({ index, onRemove }: QuestionItemProps) => {
	const { control, register } = useFormContext<GetByIdResponse>();
	const {
		fields: answerFields,
		append: appendAnswer,
		remove: removeAnswer,
	} = useFieldArray({
		control,
		name: `questions.${index}.answers`,
	});

	const addAnswer = () => {
		appendAnswer({
			id: "",
			answerText: "",
			isCorrect: false,
		});
	};

	return (
		<div className="flex items-start gap-2">
			<div className="border rounded p-3 mb-4 w-full">
				<ControlledInput name={`questions.${index}.questionText`} placeholder="Текст питання" />

				{answerFields.map((a, j) => (
					<div key={a.id} className="flex gap-2 items-center mt-2">
						<input type="checkbox" {...register(`questions.${index}.answers.${j}.isCorrect`)} />
						<ControlledInput
							name={`questions.${index}.answers.${j}.answerText`}
							placeholder={`Відповідь ${j + 1}`}
						/>
						<Icon
							icon="cross"
							className="size-6 text-gray-500 hover:text-red-500"
							onClick={() => removeAnswer(j)}
						/>
					</div>
				))}

				<Button type="button" onClick={addAnswer} className="mt-4">
					Додати відповідь
				</Button>
			</div>

			<Icon
				icon="cross"
				className="size-6 text-gray-500 hover:text-red-500 mt-3"
				onClick={onRemove}
			/>
		</div>
	);
};