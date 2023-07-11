"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface PageProps {}

const Page = ({}: PageProps) => {
  const { data: sessions } = useSession({
    required: true,
  });

  console.log(sessions);

  return <div>HELLO from client page</div>;
};
export default Page;
