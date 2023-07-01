"use client";

import { useEffect, useState } from "react";
import { ProductPropsFragment } from "../generated/graphql/graphql";
import { Input } from "./ui/input";

interface ShopProps {
  searchProducts: (searchText: string) => Promise<ProductPropsFragment[]>;
}

export const Shop = ({ searchProducts }: ShopProps) => {
  const [products, setProducts] = useState<ProductPropsFragment[]>();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    searchProducts("").then((products) => setProducts(products));
  }, [searchProducts]);

  useEffect(() => {
    const getProducts = setTimeout(async () => {
      setProducts(await searchProducts(searchText));
    }, 600);

    return () => clearTimeout(getProducts);
  }, [searchText, searchProducts]);

  return (
    <div>
      <Input onChange={(e) => setSearchText(e.target.value)} />
      <button>buscar</button>
      <div>
        {products?.map((p) => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div>
    </div>
  );
};
