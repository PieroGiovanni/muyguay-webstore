"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  ProductCategoryPropsFragment,
  ProductPropsFragment,
} from "../graphql/generated/graphql";
import { FilterButton } from "./Buttons/FilterButton";
import { Product } from "./Product";
import { Input } from "./ui/input";

interface ShopProps {
  categories: readonly ProductCategoryPropsFragment[];
  products: readonly ProductPropsFragment[];
}

export const Shop = ({ categories, products }: ShopProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 700);

  return products && categories ? (
    <div className="">
      <div className="flex w-full gap-2 items-center px-4">
        <p>Buscar: </p>
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <FilterButton categories={categories} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4">
        {products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
    </div>
  ) : null;
};
