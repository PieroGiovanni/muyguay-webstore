"use client";

import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserType } from "../graphql/generated/graphql";
import { AdminHamburgerButton } from "./Buttons/AdminHamburgerButton";

interface AdminNavBarProps {}

export const AdminNavBar = ({}: AdminNavBarProps) => {
  const { data: session } = useSession({ required: true });

  if (session && session.user.userType! !== UserType.Admin) {
    redirect("/");
  }

  return (
    <nav className="flex items-enter justify-between border-b-[1px] border-black ">
      <AdminHamburgerButton />
      <Link href="/admin" className="ml-2 text-3xl font-semibold">
        Menu Principal
      </Link>
      <Link href="/">
        <LogOut />
      </Link>
    </nav>
  );
};
