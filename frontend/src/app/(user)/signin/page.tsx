"use client";

import { EmailPasswordForm } from "../../../components/EmailPasswordForm";
import { GoogleSignInButton } from "../../../components/Buttons/GoogleSignInButton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface PageProps {}

const Page = ({}: PageProps) => {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="flex min-h-full overflow-hidden pt-16 sm:py-28">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
        <div className="relative mt-12 sm:mt-16">
          <h1 className="text-center text-2xl font-medium tracking-tight text-gray-900">
            Inicia Sesión
          </h1>
        </div>
        <div className="sm:rounded-5xl -mx-4 flex-auto bg-white px-4 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24">
          <GoogleSignInButton />
          <div className="mx-auto my-10 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            o
          </div>
          <div className="flex justify-center">
            <EmailPasswordForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Page;
