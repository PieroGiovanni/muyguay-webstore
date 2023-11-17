"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useSearchParams } from "next/navigation";
import { getFragmentData } from "../graphql/generated";
import {
  GetFilteredProductsDocument,
  ProductPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { Loading } from "./Loading";
import { Product } from "./Product";

interface ProductListProps {}

export const ProductList = ({}: ProductListProps) => {
  const [loadMoreRef, inview] = useInView();
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const searchParams = useSearchParams();

  const limit = process.env.NODE_ENV === "development" ? 8 : 28;

  const categoryId = searchParams.get("categoryId");

  const { data, fetchMore } = useSuspenseQuery(GetFilteredProductsDocument, {
    variables: {
      limit,
      query: searchParams.get("query") || undefined,
      categoryId:
        categoryId && !isNaN(parseInt(categoryId))
          ? parseInt(categoryId)
          : undefined,
      orderBy: searchParams.get("orderBy") || undefined,
    },
  });

  const products = getFragmentData(
    ProductPropsFragmentDoc,
    data.getFilteredProducts.products
  );

  useEffect(() => {
    products.length ? setCursor(products[products.length - 1].id) : undefined;
  }, [products]);

  const loadMore = useCallback(() => {
    fetchMore({
      variables: {
        cursor: cursor,
      },
    });
  }, [cursor, fetchMore]);

  useEffect(() => {
    if (inview) loadMore();
  }, [inview, loadMore]);

  return (
    <>
      <Suspense>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4">
          {products.map((p) => (
            <Product key={p.id} product={p} />
          ))}
        </div>
        {data.getFilteredProducts.hasMore ? (
          <div
            className="pt-5 w-full h-10 flex relative justify-center items-center"
            ref={loadMoreRef}
          >
            <Loading size="sm" />
          </div>
        ) : null}
      </Suspense>
    </>
  );
};
