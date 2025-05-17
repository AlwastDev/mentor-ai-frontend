import { GoogleButton, SignInForm } from "@/features/sign-in/components";

export default function SignInPage() {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="flex flex-col items-center gap-y-5">
					<h2 className="text-2xl font-bold text-[#3C3C3C]">Вхід</h2>
					<SignInForm />

					<div className="flex items-center gap-x-2 w-full">
						<div className="w-full h-[2px] bg-[#E5E5E5]" />
						<span className="text-[#AFAFAF] text-sm font-bold uppercase tracking-[0.8px]">Або</span>
						<div className="w-full h-[2px] bg-[#E5E5E5]" />
					</div>

					<GoogleButton />
				</div>
			</div>
		</>
	);
}
