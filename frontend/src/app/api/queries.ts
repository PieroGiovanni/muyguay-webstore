import { useFragment } from "../../generated/graphql/fragment-masking";
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
} from "../../generated/graphql/graphql";
import { getClient } from "../../lib/client";

export const GetUserByEmail = async (
  email: string
): Promise<UserInfo | undefined | null> => {
  const { data } = await getClient().query({
    query: GetUserByEmailDocument,
    variables: {
      email,
    },
  });

  return useFragment(RegularUserInfoFragmentDoc, data.getUserByEmail);
};

export const GetProducts = async (): Promise<
  readonly ProductPropsFragment[]
> => {
  const { data } = await getClient().query({
    query: GetProductsDocument,
  });
  return useFragment(ProductPropsFragmentDoc, data.getProducts);
};

export const GetProduct = async (id: number): Promise<ProductPropsFragment> => {
  const products = await GetProducts();
  return products.find((p) => p.id === id)!;
};

export const GetProductCategories = async (): Promise<
  readonly ProductCategoryPropsFragment[]
> => {
  const {
    data: { getProductCategories },
  } = await getClient().query({
    query: GetProductCategoriesDocument,
  });

  return useFragment(ProductCategoryPropsFragmentDoc, getProductCategories);
};

export const GetOrdersByUserId = async (
  id: number
): Promise<readonly OrderPropsFragment[]> => {
  const { data } = await getClient().query({
    query: GetOrdersByUserIdDocument,
    variables: {
      userId: id,
    },
  });

  return useFragment(OrderPropsFragmentDoc, data.getOrdersByUserId);
};
