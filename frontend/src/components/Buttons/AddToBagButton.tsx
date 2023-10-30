"use client";

import { useBagContext } from "../../app/context/bagContext";
import { AddToBag } from "../../app/utils/addToBag";
import { ProductPropsFragment } from "../../graphql/generated/graphql";
import { Button } from "../ui/button";

interface AddToBagButtonProps {
  product: ProductPropsFragment;
}

export const AddToBagButton = ({ product }: AddToBagButtonProps) => {
  const { bagProducts, setBagProducts } = useBagContext();

  return (
    <Button
      onClick={() => AddToBag(product, bagProducts, setBagProducts)}
      className="flex gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        overflow="visible"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />

        <circle
          cx="18"
          cy="19"
          r="6"
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <text x="14" y="23" fontSize="13" className="font-thin">
          +
        </text>
      </svg>
      Agregar a cartera
    </Button>
  );
};
