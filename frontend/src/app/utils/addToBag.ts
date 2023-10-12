import { Dispatch, SetStateAction } from "react";
import { toast } from "../../components/ui/use-toast";
import { ProductPropsFragment } from "../../graphql/generated/graphql";
import { ProductWithQuantity } from "../context/bagContext";

export const AddToBag = (
  product: ProductPropsFragment,
  bagProducts: ProductWithQuantity[],
  setBagProducts: Dispatch<SetStateAction<ProductWithQuantity[]>>
) => {
  const bagProduct = bagProducts.find((p) => p.id === product.id);
  if (bagProduct) {
    setBagProducts((bp) =>
      bp.map((p) =>
        p.id === bagProduct.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
    toast({
      description:
        "Agregaste " +
        (bagProduct.quantity + 1) +
        " " +
        product.name +
        " a la cartera",
    });
  } else {
    setBagProducts((bp) => [...bp, { ...product, quantity: 1 }]);
    toast({
      description: "Agregaste 1 " + product.name + " a la cartera",
    });
  }
};
