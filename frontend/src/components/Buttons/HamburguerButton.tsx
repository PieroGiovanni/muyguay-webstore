"use client";

import {
  History,
  Home,
  LogIn,
  LogOut,
  Menu,
  Shirt,
  User,
  UserCog,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserType } from "../../graphql/generated/graphql";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

interface HamburguerButtonProps {}

export const HamburguerButton = ({}: HamburguerButtonProps) => {
  const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-0">
        <SheetClose asChild>
          <Link
            href="/"
            className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
          >
            {/* <Button className="w-full gap-2"> */}
            <Home />
            Menu Principal
            {/* </Button> */}
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/tienda"
            className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
          >
            {/* <Button className="w-full gap-2"> */}
            <Shirt />
            Tienda
            {/* </Button> */}
          </Link>
        </SheetClose>
        {session ? (
          <>
            <SheetClose asChild>
              <Link
                href="/pedidos"
                className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
              >
                <History />
                Mis Pedidos
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/mi-perfil"
                className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
              >
                <User />
                Mi Perfil
              </Link>
            </SheetClose>
            {session.user.userType === UserType.Admin ? (
              <Link
                href="/admin"
                className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
              >
                <UserCog />
                Administrar
              </Link>
            ) : null}
            <SheetClose asChild>
              <div
                className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10 hover:cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut />
                Cerrar Sesión
              </div>
            </SheetClose>
          </>
        ) : (
          <SheetClose asChild>
            <div
              className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10 hover:cursor-pointer"
              onClick={() => signIn()}
            >
              <LogIn />
              Iniciar Sesión
            </div>
          </SheetClose>
        )}

        {/* <SheetClose />5 */}
      </SheetContent>
    </Sheet>
  );
};
