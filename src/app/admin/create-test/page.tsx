"use client";

import { useForm } from "react-hook-form";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "@/shared/utils/helpers";
import { GeneralTab, MaterialsTab, QuestionsTab } from "@/features/admin/create-test/components";
import { Form } from "@/shared/components/ui";

interface QuestionForm {
	text: string;
	answers: { text: string; isCorrect: boolean }[];
}

interface FormData {
	name: string;
	description?: string;
	isEntryTest: boolean;
	questions: QuestionForm[];
	materials: { title: string }[];
}

export default function AdminCreateTestPage() {
	const form = useForm<FormData>({
		defaultValues: {
			name: "",
			description: "",
			isEntryTest: false,
			questions: [{ text: "", answers: [{ text: "", isCorrect: false }] }],
			materials: [{ title: "" }],
		},
	});

	return (
		<Form form={form} className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold">Створення тесту</h1>

			<TabGroup>
				<TabList className="flex space-x-2 border-b">
					{["Загальне", "Питання", "Матеріали"].map((tab, index) => (
						<Tab
							key={index}
							className={({ selected }) =>
								cn(
									"px-4 py-2 font-medium border-b-2",
									selected ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500",
								)
							}
						>
							{tab}
						</Tab>
					))}
				</TabList>

				<TabPanels className="mt-4">
					<TabPanel>
						<GeneralTab />
					</TabPanel>

					<TabPanel>
						<QuestionsTab />
					</TabPanel>

					<TabPanel>
						<MaterialsTab />
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</Form>
	);
}
