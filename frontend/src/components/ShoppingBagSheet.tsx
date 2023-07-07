"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
import { useBagContext } from "../app/context/bagContext";
import { CldImage } from "next-cloudinary";
import { extractPublicId } from "cloudinary-build-url";

interface ShoppingBagSheetProps {}

export const ShoppingBagSheet = ({}: ShoppingBagSheetProps) => {
  const { bagProducts, setBagProducts } = useBagContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Productos en la cartera</SheetTitle>
        </SheetHeader>
        {bagProducts.length === 0 ? (
          <div>No hay productos en la cartera</div>
        ) : (
          bagProducts.map((bp) => (
            <div key={bp.bagProduct.id} className="flex">
              <CldImage
                src={
                  bp.bagProduct.images[0].cloudinaryPublicId
                    ? bp.bagProduct.images[0].cloudinaryPublicId
                    : extractPublicId(bp.bagProduct.images[0].imageUrl)
                }
                alt={bp.bagProduct.name}
                width={120}
                height={120}
              />
              <div className="flex flex-col text-sm">
                <text>{bp.bagProduct.name}</text>
                <text>s/. {bp.bagProduct.price}</text>
                <text>{bp.quantity}</text>
              </div>
            </div>
          ))
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Comprar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
