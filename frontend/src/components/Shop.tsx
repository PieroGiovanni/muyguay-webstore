"use client";

import { Label } from "@radix-ui/react-label";
import { extractPublicId } from "cloudinary-build-url";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBagContext } from "../app/context/bagContext";
import { useCategoryContext } from "../app/context/categoryContext";
import { AddToBag } from "../app/utils/addToBag";
import {
  ProductCategoryPropsFragment,
  ProductPropsFragment,
} from "../graphql/generated/graphql";
import { FilterButton } from "./Buttons/FilterButton";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Loading } from "./Loading";
import { ShopImage } from "./ShopImage";
import { Product } from "./Product";

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
  const { categoryId, setCategoryId } = useCategoryContext();
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  //FILTER BY NAME

  useEffect(() => {
    if (initialRenderComplete) {
      const getProducts = setTimeout(async () => {
        setFilteredProducts(
          products.filter(
            (p) =>
              p.name.toLowerCase().includes(searchText.toLowerCase()) &&
              (category === "all"
                ? true
                : p.productType.productCategoryId ===
                  categories.find((c) => c.name === category)!.id)
          )
        );
      }, 600);

      return () => clearTimeout(getProducts);
    }
    //eslint-disable-next-line
  }, [searchText, products]);

  //ORDER BY CATEGORY

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  const handleOrderBy = (orderBy: string) => {
    setOrderBy(orderBy);
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

    if (orderBy === "cheap") {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort((a, b) => a.price - b.price)
      );
    } else if (orderBy === "expensive") {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort((a, b) => b.price - a.price)
      );
    } else if (orderBy === "new") {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort(
          (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
        )
      );
    } else {
      setFilteredProducts((filteredProducts) =>
        [...filteredProducts].sort(
          (a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
        )
      );
    }
  }, [category, categories, products, orderBy]);

  useEffect(() => {
    if (categoryId) {
      setCategory(categories.find((c) => c.id === categoryId)?.name!);
    }
  }, [categoryId, categories]);

  return filteredProducts && categories ? (
    <div className="">
      <div className="flex w-full gap-2 items-center px-4">
        <p>Buscar: </p>
        <Input onChange={(e) => setSearchText(e.target.value)} />
        <FilterButton
          handleCategory={handleCategory}
          handleOrderBy={handleOrderBy}
          categories={categories}
          defaultCategory={category}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4">
        {filteredProducts.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
    </div>
  ) : null;
};
