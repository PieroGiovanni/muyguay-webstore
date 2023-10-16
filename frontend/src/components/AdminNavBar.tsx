"use client";

import Link from "next/link";
import Image from "next/image";
import { AdminHamburgerButton } from "./Buttons/AdminHamburgerButton";
import { HamburguerButton } from "./Buttons/HamburguerButton";
import { useSession } from "next-auth/react";
import { UserType } from "../graphql/generated/graphql";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

interface AdminNavBarProps {}

export const AdminNavBar = ({}: AdminNavBarProps) => {
  const { data: session } = useSession({ required: true });

  if (session && session.user.userType! !== UserType.Admin) {
    redirect("/");
  }

  return (
    <nav className="flex items-enter justify-between ">
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
