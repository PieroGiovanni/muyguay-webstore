import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { PaginatedProducts } from "../graphql/generated/graphql";
import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({}),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
    }),
  });
});
