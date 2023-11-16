"use server";

import { getFragmentData } from "../../graphql/generated/fragment-masking";
import {
  BrandPropsFragment,
  BrandPropsFragmentDoc,
  GetBrandsDocument,
  GetFeaturedProductsDocument,
  GetFilteredProductsDocument,
  GetNewProductsDocument,
  GetProductCategoriesDocument,
  GetProductDocument,
  GetProductsDocument,
  GetUserByEmailDocument,
  ProductCategoryPropsFragment,
  ProductCategoryPropsFragmentDoc,
  ProductPropsFragment,
  ProductPropsFragmentDoc,
  RegularUserInfoFragmentDoc,
  UserInfo,
} from "../../graphql/generated/graphql";
import { getClient } from "../../lib/client";

export const getUserByEmail = async (
  email: string
): Promise<UserInfo | undefined | null> => {
  const { data } = await getClient().query({
    query: GetUserByEmailDocument,
    variables: {
      email,
    },
  });

  return getFragmentData(RegularUserInfoFragmentDoc, data.getUserByEmail);
};

export const getProducts = async (): Promise<
  readonly ProductPropsFragment[]
> => {
  const { data } = await getClient().query({
    query: GetProductsDocument,
    context: {
      fetchOptions: {
        next: {
          tags: ["products"],
        },
      },
    },
  });
  return getFragmentData(ProductPropsFragmentDoc, data.getProducts);
};

export const fetchFilteredProducts = async ({
  query,
  categoryId,
  orderBy,
  cursor,
}: {
  query?: string;
  categoryId?: string;
  orderBy?: string;
  cursor?: number;
}) => {
  const limit = 28;

  const { data } = await getClient().query({
    query: GetFilteredProductsDocument,
    variables: {
      query,
      categoryId:
        categoryId && !isNaN(parseInt(categoryId))
          ? parseInt(categoryId)
          : undefined,
      orderBy,
      limit,
      cursor,
    },
    context: {
      fetchOptions: {
        next: {
          tags: ["filteredProducts"],
        },
      },
    },
  });

  return {
    products: getFragmentData(
      ProductPropsFragmentDoc,
      data.getFilteredProducts.products
    ),
    hasMore: data.getFilteredProducts.hasMore,
  };
};

export const getProduct = async (id: number): Promise<ProductPropsFragment> => {
  const { data } = await getClient().query({
    query: GetProductDocument,
    variables: {
      id,
    },
  });
  return getFragmentData(ProductPropsFragmentDoc, data.getProduct);
};

export const getProductCategories = async (): Promise<
  readonly ProductCategoryPropsFragment[]
> => {
  const {
    data: { getProductCategories },
  } = await getClient().query({
    query: GetProductCategoriesDocument,
  });

  return getFragmentData(ProductCategoryPropsFragmentDoc, getProductCategories);
};

export const getBrands = async (): Promise<readonly BrandPropsFragment[]> => {
  const { data } = await getClient().query({
    query: GetBrandsDocument,
  });

  return getFragmentData(BrandPropsFragmentDoc, data.getBrands);
};

export const getFeaturedProducts = async (): Promise<
  readonly ProductPropsFragment[]
> => {
  const { data } = await getClient().query({
    query: GetFeaturedProductsDocument,
  });
  return getFragmentData(ProductPropsFragmentDoc, data.getFeaturedProducts);
};

export const getNewProducts = async (
  quantity: number
): Promise<readonly ProductPropsFragment[]> => {
  const { data } = await getClient().query({
    query: GetNewProductsDocument,
    variables: {
      quantity,
    },
  });
  return getFragmentData(ProductPropsFragmentDoc, data.getNewProducts);
};
