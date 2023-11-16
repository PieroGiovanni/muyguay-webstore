"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchFilteredProducts } from "../app/api/queries";
import {
  ProductCategoryPropsFragment,
  ProductPropsFragment,
} from "../graphql/generated/graphql";
import { Loading } from "./Loading";
import { Product } from "./Product";
import { useSearchParams } from "next/navigation";

interface ProductListProps {
  initailProducts: {
    products: readonly ProductPropsFragment[];
    hasMore: boolean;
  };
}

export const ProductList = ({ initailProducts }: ProductListProps) => {
  const [products, setProducts] = useState(initailProducts.products);
  const [hasMore, setHasMore] = useState(initailProducts.hasMore);
  const [loadMoreRef, inview] = useInView();
  const [cursor, setCursor] = useState<undefined | number>(undefined);
  const searchParams = useSearchParams();

  useEffect(() => {
    setProducts(initailProducts.products);
    setHasMore(initailProducts.hasMore);
  }, [initailProducts]);

  useEffect(() => {
    if (products.length) {
      setCursor(products[products.length - 1].id);
    }
  }, [products]);

  const loadMore = useCallback(async () => {
    const newProducts = await fetchFilteredProducts({
      query: searchParams.get("query") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      orderBy: searchParams.get("orderBy") || undefined,
      cursor,
    });

    setProducts((prev) => [...prev, ...newProducts.products]);
    setHasMore(newProducts.hasMore);
    console.log("executing from loadMore");
  }, [cursor, searchParams]);

  useEffect(() => {
    if (inview) loadMore();
  }, [inview, loadMore]);

  return (
    <>
      {products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4">
          {products.map((p) => (
            <Product key={p.id} product={p} />
          ))}
        </div>
      ) : null}

      {hasMore ? (
        <div
          className="pt-5 w-full h-10 flex relative justify-center items-center"
          ref={loadMoreRef}
        >
          <Loading size="sm" />
        </div>
      ) : null}
    </>
  );
};
