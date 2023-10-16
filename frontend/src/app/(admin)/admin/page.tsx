import { Boxes, Cog, PackagePlus } from "lucide-react";
import Link from "next/link";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="mt-20 justify-center flex">
      <div className="flex flex-col md:w-[25vw] w-[90vw]">
        <Link
          href="/admin/productos"
          className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
        >
          <Cog />
          Editar Productos
        </Link>

        <Link
          href="/admin/agregar-producto"
          className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
        >
          <PackagePlus />
          Agregar Productos
        </Link>
        <Link
          href="/admin/pedidos"
          className="flex h-10 gap-2 hover:bg-slate-100 items-center pl-10"
        >
          <Boxes />
          Actualizar Pedidos
        </Link>
      </div>
    </div>
  );
};
export default Page;
