import { GoogleButton, SignUpForm } from "@/features/sign-up/components";

export default function SignUpPage() {
	return (
		<>
			<div className="flex h-screen flex-col items-center justify-center">
				<div className="flex flex-col items-center gap-y-5">
					<h2 className="text-2xl font-bold text-[#3C3C3C]">
						Створити профіль
					</h2>

					<SignUpForm />

					<div className="flex w-full items-center gap-x-2">
						<div className="h-[2px] w-full bg-[#E5E5E5]" />
						<span className="text-sm font-bold uppercase tracking-[0.8px] text-[#AFAFAF]">
							Або
						</span>
						<div className="h-[2px] w-full bg-[#E5E5E5]" />
					</div>

					<GoogleButton />
				</div>
			</div>
		</>
	);
}
