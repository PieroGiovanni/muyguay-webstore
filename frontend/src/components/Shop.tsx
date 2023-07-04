"use client";

import { useEffect, useState } from "react";
import {
  ProductCategoryPropsFragment,
  ProductPropsFragment,
} from "../generated/graphql/graphql";
import { Input } from "./ui/input";
import { FilterButton } from "./FilterButton";

interface ShopProps {
  categories: readonly ProductCategoryPropsFragment[];
  products: readonly ProductPropsFragment[];
}

export const Shop = ({ categories, products }: ShopProps) => {
  const [filteredProducts, setFilteredProducts] =
    useState<readonly ProductPropsFragment[]>(products);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getProducts = setTimeout(async () => {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }, 600);

    return () => clearTimeout(getProducts);
  }, [searchText, products]);

  const handleCategory = (category: string) => {
    if (category !== "all") {
      const categoryId = categories.find((c) => c.name === category)?.id;

      setFilteredProducts(
        products.filter((p) => p.productType.productCategoryId === categoryId)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    console.log(filteredProducts);
  }, [filteredProducts]);

  return products && categories ? (
    <div>
      <div className="flex w-full">
        <Input onChange={(e) => setSearchText(e.target.value)} />
        <FilterButton handleCategory={handleCategory} categories={categories} />
      </div>
      <div>
        {filteredProducts?.map((p) => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div>
    </div>
  ) : null;
};
