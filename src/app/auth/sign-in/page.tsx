import Link from "next/link";

import { GoogleButton, SignInForm } from "@/features/sign-in/components";
import { Button } from "@/shared/components/ui";
import { ROUTES } from "@/shared/utils/routes";

export default function SignInPage() {
  return (
    <>
      <Link className="absolute top-7 right-7" href={ROUTES.SignUp}>
        <Button className="w-[100px]" color="white">Sign up</Button>
      </Link>

      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-y-5">
          <h2 className="text-2xl font-bold text-[#3C3C3C]">Log in</h2>
          <SignInForm />

          <div className="flex items-center gap-x-2 w-full">
            <div className="w-full h-[2px] bg-[#E5E5E5]" />
            <span className="text-[#AFAFAF] text-sm font-bold uppercase tracking-[0.8px]">Or</span>
            <div className="w-full h-[2px] bg-[#E5E5E5]" />
          </div>

          <GoogleButton />
        </div>
      </div></>
  );
}
