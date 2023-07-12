"use client";

import { History, Home, LogIn, LogOut, Menu, Shirt, User } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

interface HamburguerButtonProps {}

export const HamburguerButton = ({}: HamburguerButtonProps) => {
  const pathname = usePathname();

  console.log(pathname);
  const { data: session } =
    useSession();
    //     {
    //     required: false,
    //     onUnauthenticated() {
    //       redirect(`/signin?callbackUrl=${pathname}`);
    //     },
    //   }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetClose asChild>
          <Link href="/">
            <Button>
              <Home />
              Menu Principal
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/tienda">
            <Button>
              <Shirt />
              Productos
            </Button>
          </Link>
        </SheetClose>
        {session ? (
          <SheetClose asChild>
            <Link href="/cliente/id/hisorial">
              <Button>
                <History />
                Historial
              </Button>
            </Link>
          </SheetClose>
        ) : null}
        {session ? (
          <SheetClose asChild>
            <Link href="/cliente/id/perfil">
              <Button className="w-full gap-2">
                <User />
                Perfil
              </Button>
            </Link>
          </SheetClose>
        ) : null}

        {session ? (
          <Button onClick={() => signOut()}>
            <LogOut />
            Cerrar Sesión
          </Button>
        ) : (
          <SheetClose asChild>
            <Button onClick={() => signIn()}>
              <LogIn />
              Iniciar Sesión
            </Button>
          </SheetClose>
        )}

        {/* <SheetClose />5 */}
      </SheetContent>
    </Sheet>
  );
};
