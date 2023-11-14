"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getFragmentData } from "../graphql/generated";
import {
  GetFilteredProductsDocument,
  ProductCategoryPropsFragment,
  ProductPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { FilterButton } from "./Buttons/FilterButton";
import { Product } from "./Product";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { Loading } from "./Loading";

interface ShopProps {
  categories: readonly ProductCategoryPropsFragment[];
  searchParams?: {
    query?: string;
    categoryId?: string;
    orderBy?: string;
    cursor?: string;
  };
}

export const Shop = ({ categories, searchParams }: ShopProps) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams?.query;
  const categoryId =
    searchParams?.categoryId && !isNaN(parseInt(searchParams.categoryId))
      ? parseInt(searchParams.categoryId)
      : undefined;
  const orderBy = searchParams?.orderBy;

  const limit = 28;

  const { data, fetchMore } = useSuspenseQuery(GetFilteredProductsDocument, {
    variables: {
      limit,
      query,
      orderBy,
      categoryId,
    },
  });

  const products = getFragmentData(
    ProductPropsFragmentDoc,
    data.getFilteredProducts.products
  );

  const loadMoreRef = useRef(null);

  const loadMore = useCallback(() => {
    fetchMore({
      variables: {
        limit,
        cursor: products[products.length - 1].id,
      },
    });
  }, [products, fetchMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 1,
      }
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreRef, loadMore]);

  const handleSearch = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 700);

  return data && categories ? (
    <>
      <div className="flex w-full gap-2 items-center px-4">
        <p>Buscar: </p>
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams?.query}
        />
        <FilterButton categories={categories} />
      </div>
      <Suspense fallback={<div>Cargando...</div>}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4">
          {products.map((p) => (
            <Product key={p.id} product={p} />
          ))}
        </div>
      </Suspense>
      {data.getFilteredProducts.hasMore ? (
        <div
          className="w-full h-24 flex relative justify-center items-center"
          ref={loadMoreRef}
        >
          <Loading />
        </div>
      ) : null}
    </>
  ) : null;
};
