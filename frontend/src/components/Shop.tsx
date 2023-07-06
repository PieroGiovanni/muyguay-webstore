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
  const [orderBy, setOrderBy] = useState("new");
  const [category, setCategory] = useState("all");

  //FILTER BY NAME

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

  //ORDER BY CATEGORY

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  useEffect(() => {
    if (category !== "all") {
      const categoryId = categories.find((c) => c.name === category)?.id;

      setFilteredProducts(
        products.filter((p) => p.productType.productCategoryId === categoryId)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [category, categories, products]);

  //ORDER BY NEW, CHEAPEST OR MOST EXPENSIVE

  const handleOrderBy = (order: string) => {
    setOrderBy(order);
  };

  useEffect(() => {
    if (orderBy === "cheap") {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort((a, b) => a.price - b.price)
      );
    } else if (orderBy === "expensive") {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort((a, b) => a.updatedAt - b.updatedAt)
      );
    }
  }, [orderBy]);

  return filteredProducts && categories ? (
    <div>
      <div className="flex w-full">
        <Input onChange={(e) => setSearchText(e.target.value)} />
        <FilterButton
          handleCategory={handleCategory}
          handleOrderBy={handleOrderBy}
          categories={categories}
        />
      </div>
      <div>
        {filteredProducts?.map((p) => (
          <div key={p.name}>{p.name}</div>
        ))}
      </div>
    </div>
  ) : null;
};
