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
  const { bagProducts, setBagProducts } = useBagContext();

  const { toast } = useToast();

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
          <div key={p.id} className="relative">
            <Link key={p.name} href={`/productos/${p.id}`}>
              <Card className="flex flex-col rounded-sm">
                <Label className="flex text-xs h-8 justify-center items-center">
                  {p.name}
                </Label>
                <CldImage
                  src={
                    p.images[0].imageUrl
                      ? extractPublicId(p.images[0].imageUrl!)
                      : "/image-not-found.webp"
                  }
                  alt={p.name}
                  width={300}
                  height={300}
                  // sizes="(max-width: 768px) 30vw"
                />
                <Label className="flex text-lg ml-2 items-center font-bold">
                  S/. {p.price}
                </Label>
              </Card>
            </Link>
            <div className="absolute bottom-1 right-1">
              <button
                className="rounded-full relative border-2 border-black w-10 h-10 items-center flex justify-center bg-white"
                onClick={() => AddToBag(p, bagProducts, setBagProducts)}
              >
                {/* <ShoppingBag /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  overflow="visible"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />

                  <circle
                    cx="18"
                    cy="19"
                    r="6"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text x="14" y="23" fontSize="13" className="font-thin">
                    +
                  </text>
                </svg>
                {/* <div className="absolute w-[0.1%] h-[0.1px]">
                  <Plus />
                </div> */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
