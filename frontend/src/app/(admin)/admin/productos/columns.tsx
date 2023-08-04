"use client";
import { ColumnDef } from "@tanstack/react-table";
import { RegularProductDataFragment } from "../../../../graphql/generated/graphql";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { Button } from "../../../../components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { UpdateProductForm } from "../../../../components/UpdateProductForm";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export const columns: ColumnDef<RegularProductDataFragment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem>Open</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Eliminar Producto</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar Productos</DialogTitle>

              <UpdateProductForm productId={product.id} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

const handleUpdateProduct = (id: number) => {};
