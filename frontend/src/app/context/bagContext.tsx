"use client";

import React, { createContext, useContext, useState } from "react";
import { ProductPropsFragment } from "../../generated/graphql/graphql";

interface BagContextProviderProps {
  children: React.ReactNode;
}

interface BagContextType {
  bagProducts: {
    bagProduct: ProductPropsFragment;
    quantity: number;
  }[];
  setBagProducts: React.Dispatch<
    React.SetStateAction<
      {
        bagProduct: ProductPropsFragment;
        quantity: number;
      }[]
    >
  >;
}

const BagContext = createContext({});

export const BagContextProvider = ({ children }: BagContextProviderProps) => {
  const [bagProducts, setBagProducts] = useState<
    {
      bagProduct: ProductPropsFragment;
      quantity: number;
    }[]
  >([]);

  return (
    <BagContext.Provider value={{ bagProducts, setBagProducts }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBagContext = () => useContext(BagContext) as BagContextType;
