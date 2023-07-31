"use client";

import { useEffect, useState } from "react";
import {
  ProductCategoryPropsFragment,
  ProductPropsFragment,
} from "../graphql/generated/graphql";
import { Input } from "./ui/input";
import { FilterButton } from "./Buttons/FilterButton";
import { CldImage } from "next-cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import { Label } from "@radix-ui/react-label";
import { Card } from "./ui/card";
import Link from "next/link";
import { useCategoryContext } from "../app/context/categoryContext";

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

  useEffect(() => {
    if (categoryId) {
      setCategory(categories.find((c) => c.id === categoryId)?.name!);
    }
  }, [categoryId, categories]);

  //ORDER BY NEW, CHEAPEST OR MOST EXPENSIVE

  const handleOrderBy = (orderBy: string) => {
    setOrderBy(orderBy);
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
  }, [orderBy]);

  return filteredProducts && categories ? (
    <div className="">
      <div className="flex w-full">
        <Input onChange={(e) => setSearchText(e.target.value)} />
        <FilterButton
          handleCategory={handleCategory}
          handleOrderBy={handleOrderBy}
          categories={categories}
          defaultCategory={category}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 px-4">
        {filteredProducts.map((p) => (
          <Link key={p.name} href={`/productos/${p.id}`}>
            <Card className="flex flex-col items-center rounded-sm">
              <Label className="">{p.name}</Label>
              <CldImage
                src={extractPublicId(p.images[0].imageUrl!)}
                alt={p.name}
                width={300}
                height={300}
                // sizes="(max-width: 768px) 30vw"
              />
              <Label className="">S/. {p.price}</Label>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  ) : null;
};
