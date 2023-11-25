"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { PaginatedProducts } from "../graphql/generated/graphql";

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getFilteredProducts: {
              keyArgs: ["query", "categoryId", "orderBy", "limit"],
              merge(
                existing: PaginatedProducts,
                incoming: PaginatedProducts,
                { readField }
              ) {
                const mergedProducts = existing
                  ? existing.products.slice(0)
                  : [];

                const existingIdSet = new Set(
                  mergedProducts.map((product) => {
                    return readField("id", product);
                  })
                );

                const filteredIncomingProducts = incoming.products.filter(
                  (product) => !existingIdSet.has(readField("id", product))
                );

                return {
                  ...incoming,
                  products: [...mergedProducts, ...filteredIncomingProducts],
                };
              },
            },
          },
        },
      },
    }),
    connectToDevTools: true,
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
