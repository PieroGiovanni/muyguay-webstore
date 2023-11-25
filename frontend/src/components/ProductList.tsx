"use client";

import {
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getFragmentData } from "../graphql/generated";
import {
  GetFilteredProductsDocument,
  ProductPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { LoadingSpinner } from "./LoadingSpinner";
import { Product } from "./Product";

interface ProductListProps {
  variables: {
    limit: number;
    query?: string | undefined;
    categoryId?: string | undefined;
    orderBy?: string | undefined;
  };
}

export const ProductList = ({ variables }: ProductListProps) => {
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const { data, fetchMore } = useSuspenseQuery(GetFilteredProductsDocument, {
    variables: {
      limit: variables.limit,
      query: variables.query,
      categoryId: variables.categoryId,
      orderBy: variables.orderBy,
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
    startTransition(() => {
      fetchMore({
        variables: {
          cursor,
        },
      });
    });
  }, [cursor, fetchMore]);

  const loadMoreRef = useRef(null);

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

  return (
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
          <LoadingSpinner size="sm" />
        </div>
      ) : null}
    </Suspense>
  );
};

export default ProductList;
