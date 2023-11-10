import { ApolloError } from "@apollo/client";
import { getFragmentData } from "../../graphql/generated/fragment-masking";
import {
  BrandPropsFragment,
  BrandPropsFragmentDoc,
  GetBrandsDocument,
  GetFilteredProductsDocument,
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

export const getFilteredProducts = async (
  query?: string,
  categoryId?: number,
  orderBy?: string
): Promise<readonly ProductPropsFragment[]> => {
  const { data } = await getClient().query({
    query: GetFilteredProductsDocument,
    variables: {
      query,
      categoryId,
      orderBy,
    },

    context: {
      fetchOptions: {
        next: {
          tags: ["filteredProducts"],
          revalidate: 1,
        },
      },
    },
  });
  return getFragmentData(ProductPropsFragmentDoc, data.getFilteredProducts);
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
