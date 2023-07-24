import { useFragment } from "../../generated/graphql/fragment-masking";
import {
  GetProductCategoriesDocument,
  GetProductsDocument,
  GetUserByEmailDocument,
  LoginDocument,
  ProductCategoryPropsFragment,
  ProductCategoryPropsFragmentDoc,
  ProductPropsFragment,
  ProductPropsFragmentDoc,
  RegularErrorFragment,
  RegularErrorFragmentDoc,
  RegularUserInfoFragment,
  RegularUserInfoFragmentDoc,
  RegularUserResponseFragmentDoc,
  User,
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
