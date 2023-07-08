"use client";

import { useEffect } from "react";
import { useBagContext } from "../app/context/bagContext";
import { ProductPropsFragment } from "../generated/graphql/graphql";
import { Button } from "./ui/button";

interface AddToBagButtonProps {
  product: ProductPropsFragment;
}

export const AddToBagButton = ({ product }: AddToBagButtonProps) => {
  const { setBagProducts } = useBagContext();

  const OnClick = () => {
    setBagProducts((bp) => [...bp, { ...product, quantity: 1 }]);
  };

  return <Button onClick={() => OnClick()}>Agregar a la bolsa</Button>;
};
