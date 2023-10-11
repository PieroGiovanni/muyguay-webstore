"use client";

import { useEffect } from "react";
import { useBagContext } from "../../app/context/bagContext";
import { Button } from "../ui/button";
import { ProductPropsFragment } from "../../graphql/generated/graphql";

interface AddToBagButtonProps {
  product: ProductPropsFragment;
}

export const AddToBagButton = ({ product }: AddToBagButtonProps) => {
  const { bagProducts, setBagProducts } = useBagContext();

  const OnClick = () => {
    if (!bagProducts.find((p) => p.id === product.id))
      setBagProducts((bp) => [...bp, { ...product, quantity: 1 }]);
  };

  return <Button onClick={() => OnClick()}>Agregar a la bolsa</Button>;
};
