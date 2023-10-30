"use client";

import { extractPublicId } from "cloudinary-build-url";
import { Trash2 } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBagContext } from "../app/context/bagContext";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface ShoppingBagSheetProps {}

export const ShoppingBagSheet = ({}: ShoppingBagSheetProps) => {
  const { bagProducts, setBagProducts } = useBagContext();
  const [total, setTotal] = useState(0);

  const addQuantity = (productId: number) => {
    setBagProducts(
      bagProducts.map((p) => {
        if (p.id === productId) {
          return { ...p, quantity: p.quantity + 1 };
        }
        return p;
      })
    );
  };

  const subtractQuantity = (productId: number) => {
    setBagProducts(
      bagProducts.map((p) => {
        if (p.id === productId && p.quantity > 1) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      })
    );
  };

  const deleteProduct = (productId: number) => {
    setBagProducts(bagProducts.filter((p) => p.id !== productId));
  };

  useEffect(() => {
    let total = 0;
    bagProducts.map((p) => {
      total = total + p.price * p.quantity;
    });
    setTotal(total);
  }, [bagProducts]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="focus:outline-none relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-9 h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          {bagProducts.length > 0 ? (
            <span className="absolute top-6 right-0 flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-xs">
              {bagProducts.length}
            </span>
          ) : null}
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-scroll flex flex-col items-center">
        <SheetHeader>
          <SheetTitle>Productos en la cartera</SheetTitle>
        </SheetHeader>
        {bagProducts.length === 0 ? (
          <div>No hay productos en la cartera</div>
        ) : (
          <div className="flex flex-col gap-2">
            {bagProducts.map((bp) => (
              <div key={bp.id} className="flex gap-2 items-center">
                <div className="w-20 relative h-20  shrink-0">
                  <CldImage
                    src={
                      bp.images[0].cloudinaryPublicId
                        ? bp.images[0].cloudinaryPublicId
                        : extractPublicId(bp.images[0].imageUrl!)
                    }
                    alt={bp.name}
                    fill
                    sizes="10vw"
                  />
                </div>
                <div className="flex flex-col text-sm">
                  <Label>{bp.name}</Label>
                  <div className="flex flex-row gap-[1px] items-center">
                    <button
                      className="border-2 border-black w-7 h-7 rounded-md"
                      onClick={() => subtractQuantity(bp.id)}
                    >
                      -
                    </button>
                    <div className="h-9 items-center w-5 flex justify-center px-1">
                      {bp.quantity}
                    </div>
                    <button
                      className="border-2 border-black w-7 h-7 rounded-md"
                      onClick={() => addQuantity(bp.id)}
                    >
                      +
                    </button>
                    <button
                      className="ml-10"
                      onClick={() => deleteProduct(bp.id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                  <Label>s/. {bp.price * bp.quantity}</Label>
                </div>
              </div>
            ))}
            <div>TOTAL: S/. {total}</div>
          </div>
        )}
        <SheetFooter className="flex justify-center">
          {bagProducts.length > 0 ? (
            <SheetClose asChild>
              <Link href="/confirmar-pedido">
                <Button>Comprar</Button>
              </Link>
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Link href="/tienda" className="flex justify-center">
                <Button>Ver Productos</Button>
              </Link>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
