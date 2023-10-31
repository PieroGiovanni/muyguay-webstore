import { getFragmentData } from "../../graphql/generated/fragment-masking";
import {
  BrandPropsFragment,
  BrandPropsFragmentDoc,
  GetBrandsDocument,
  GetOrdersByUserIdDocument,
  GetProductCategoriesDocument,
  GetProductTypesDocument,
  GetProductsDataDocument,
  GetProductsDocument,
  GetUserByEmailDocument,
  OrderPropsFragment,
  OrderPropsFragmentDoc,
  ProductCategoryPropsFragment,
  ProductCategoryPropsFragmentDoc,
  ProductPropsFragment,
  ProductPropsFragmentDoc,
  ProductTypePropsFragment,
  ProductTypePropsFragmentDoc,
  RegularProductDataFragment,
  RegularProductDataFragmentDoc,
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

export const getProduct = async (id: number): Promise<ProductPropsFragment> => {
  const products = await getProducts();
  return products.find((p) => p.id === id)!;
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

export const getProductTypes = async (): Promise<
  readonly ProductTypePropsFragment[]
> => {
  const { data } = await getClient().query({
    query: GetProductTypesDocument,
  });

  return getFragmentData(ProductTypePropsFragmentDoc, data.getProductTypes);
};

export const getBrands = async (): Promise<readonly BrandPropsFragment[]> => {
  const { data } = await getClient().query({
    query: GetBrandsDocument,
  });

  return getFragmentData(BrandPropsFragmentDoc, data.getBrands);
};
