"use client";

import { createContext } from "react";
import { getClient } from "../../lib/client";
import {
  GetImagesDocument,
  GetProductsDocument,
} from "../../generated/graphql/graphql";

const getProducts = async () => {
  const { data } = await getClient().query({
    query: GetProductsDocument,
  });
  return data;
};

const { data: images } = await getClient().query({ query: GetImagesDocument });

export const ProductsContext = createContext(getProducts);

export const ImagesContext = createContext(images);

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {};
