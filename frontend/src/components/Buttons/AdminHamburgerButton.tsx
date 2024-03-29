import { Menu } from "lucide-react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

interface AdminHamburgerButtonProps {}

export const AdminHamburgerButton = ({}: AdminHamburgerButtonProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <Label className="text-base">Productos</Label>
        <SheetClose asChild>
          <Link href="/admin/productos" className="ml-6">
            <div>Editar Productos</div>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/admin/agregar-producto" className="ml-6">
            <div>Agregar Producto</div>
          </Link>
        </SheetClose>

        <Label className="text-base">Pedidos</Label>
        <SheetClose asChild>
          <Link href="/admin/pedidos" className="ml-6">
            <div>Actualizar Pedidos</div>
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
