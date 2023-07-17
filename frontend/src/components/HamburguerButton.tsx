"use client";

import { History, Home, LogIn, LogOut, Menu, Shirt, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

interface HamburguerButtonProps {}

export const HamburguerButton = ({}: HamburguerButtonProps) => {
  // const pathname = usePathname();

  // console.log(pathname);
  const { data: session } = useSession();
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
