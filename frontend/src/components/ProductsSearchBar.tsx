"use client";

import { Input } from "./ui/input";

interface ProductsSearchBarProps {
  handleOnChange: (text: string) => void;
}

export const ProductsSearchBar = ({
  handleOnChange,
}: ProductsSearchBarProps) => {
  return <Input onChange={(e) => handleOnChange(e.target.value)} />;
};
