"use client";

import {
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getFragmentData } from "../graphql/generated";
import {
  GetFilteredProductsDocument,
  ProductPropsFragment,
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
  const [products, setProducts] = useState<ProductPropsFragment[]>([]);
  const [hasMore, setHasMore] = useState<boolean>();

  const { data, fetchMore } = useSuspenseQuery(GetFilteredProductsDocument, {
    variables: {
      limit: variables.limit,
      query: variables.query,
      categoryId: variables.categoryId,
      orderBy: variables.orderBy,
    },
  });

  useEffect(() => {
    let products = getFragmentData(
      ProductPropsFragmentDoc,
      data.getFilteredProducts.products
    );
    startTransition(() => {
      products.length ? setCursor(products[products.length - 1].id) : undefined;
      setHasMore(data.getFilteredProducts.hasMore);
      setProducts([...products]);
    });
  }, [data]);

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
        rootMargin: "300px",
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
    <Suspense fallback={<LoadingSpinner />}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 pt-4">
        {products.map((p) => (
          <Product key={p.id} product={p} />
        ))}
      </div>
      {hasMore ? (
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
