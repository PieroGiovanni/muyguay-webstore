"use client";

import React, { createContext, useContext, useState } from "react";

interface CategoryContextProviderProps {
  children: React.ReactNode;
}

interface CategoryContextType {
  categoryId: number | null;
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CategoryContext = createContext({});

export const CategoryContextProvider = ({
  children,
}: CategoryContextProviderProps) => {
  const [categoryId, setCategoryId] = useState<CategoryContextType>();

  return (
    <CategoryContext.Provider value={{ categoryId, setCategoryId }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () =>
  useContext(CategoryContext) as CategoryContextType;
