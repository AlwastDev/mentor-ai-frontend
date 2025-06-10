import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Features = {
	code?: boolean;
	preview?: boolean;
	live?: boolean;
	edit?: boolean;
	image?: boolean;
};

type ControlledTextareaProps = {
	name: string;
	features?: Features;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const ControlledTextarea = (props: ControlledTextareaProps) => {
	const { placeholder, features, ...rest } = props;

	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			{...rest}
			defaultValue=""
			render={({ field }) => (
				<MDEditor
					data-color-mode="light"
					className="w-full"
					value={field.value}
					onChange={field.onChange}
					height={250}
					preview="edit"
					defaultTabEnable
					commandsFilter={(cmd) => {
						if (
							features &&
							cmd.name &&
							Object.keys(features).some(
								(key) => key === cmd.name && features[key as keyof Features],
							)
						) {
							return cmd;
						}
						return false;
					}}
					textareaProps={{
						placeholder,
					}}
				/>
			)}
		/>
	);
};
