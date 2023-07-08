"use client";

import React, { createContext, useContext, useState } from "react";
import { ProductPropsFragment } from "../../generated/graphql/graphql";

interface BagContextProviderProps {
  children: React.ReactNode;
}

interface ProductWithQuantity extends ProductPropsFragment {
  quantity: number;
}

interface BagContextType {
  bagProducts: ProductWithQuantity[];
  setBagProducts: React.Dispatch<React.SetStateAction<ProductWithQuantity[]>>;
}

const BagContext = createContext({});

export const BagContextProvider = ({ children }: BagContextProviderProps) => {
  const [bagProducts, setBagProducts] = useState<ProductWithQuantity[]>([]);

  return (
    <BagContext.Provider value={{ bagProducts, setBagProducts }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBagContext = () => useContext(BagContext) as BagContextType;
