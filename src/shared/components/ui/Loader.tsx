import { memo } from "react";

export const Loader = memo(() => {
	return (
		<div className="w-full mx-auto max-w-7xl animate-pulse px-6 pt-32">
			<div className="h-10 w-3/4 rounded bg-zinc-300" />
			<div className="mt-4 h-10 w-1/2 rounded bg-zinc-300" />
			<div className="mt-8 h-12 w-48 rounded-xl bg-zinc-300" />
		</div>
	);
});
