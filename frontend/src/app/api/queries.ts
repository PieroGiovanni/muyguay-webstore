import { getFragmentData } from "../../graphql/generated/fragment-masking";
import {
  GetOrdersByUserIdDocument,
  GetProductCategoriesDocument,
  GetProductsDocument,
  GetUserByEmailDocument,
  OrderPropsFragment,
  OrderPropsFragmentDoc,
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

export const getOrdersByUserId = async (
  id: number
): Promise<readonly OrderPropsFragment[]> => {
  const { data } = await getClient().query({
    query: GetOrdersByUserIdDocument,
    variables: {
      userId: id,
    },
  });

  return getFragmentData(OrderPropsFragmentDoc, data.getOrdersByUserId);
};
