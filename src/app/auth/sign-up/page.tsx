import Link from "next/link";

import { GoogleButton, SignUpForm } from "@/features/sign-up/components";
import { ROUTES } from "@/shared/utils/routes";
import { Button } from "@/shared/components/ui";

export default function SignUpPage() {
  return (
    <>
      <Link className="absolute top-7 right-7" href={ROUTES.SignIn}>
        <Button className="w-[100px]" color="white">Sign in</Button>
      </Link>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-y-5">
          <h2 className="text-2xl font-bold text-[#3C3C3C]">Create your profile</h2>

          <SignUpForm />

          <div className="flex items-center gap-x-2 w-full">
            <div className="w-full h-[2px] bg-[#E5E5E5]" />
            <span className="text-[#AFAFAF] text-sm font-bold uppercase tracking-[0.8px]">Or</span>
            <div className="w-full h-[2px] bg-[#E5E5E5]" />
          </div>

          <GoogleButton />
        </div>
      </div>
    </>
  );
}
