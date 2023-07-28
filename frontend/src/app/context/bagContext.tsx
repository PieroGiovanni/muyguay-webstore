"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductPropsFragment } from "../../graphql/generated/graphql";

interface BagContextProviderProps {
  children: React.ReactNode;
}

export interface ProductWithQuantity extends ProductPropsFragment {
  quantity: number;
}

interface BagContextType {
  bagProducts: ProductWithQuantity[];
  setBagProducts: React.Dispatch<React.SetStateAction<ProductWithQuantity[]>>;
}

const BagContext = createContext({});

export const BagContextProvider = ({ children }: BagContextProviderProps) => {
  const [bagProducts, setBagProducts] = useState<ProductWithQuantity[]>([]);

  useEffect(() => {
    const savedBagProducts = localStorage.getItem("bagProducts");
    if (savedBagProducts) {
      setBagProducts(JSON.parse(savedBagProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bagProducts", JSON.stringify(bagProducts));
  }, [bagProducts]);

  return (
    <BagContext.Provider value={{ bagProducts, setBagProducts }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBagContext = () => useContext(BagContext) as BagContextType;
