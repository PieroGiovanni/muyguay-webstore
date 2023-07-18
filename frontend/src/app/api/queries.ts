import { useFragment } from "../../generated/graphql/fragment-masking";
import {
  GetProductCategoriesDocument,
  GetProductsDocument,
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
} from "../../generated/graphql/graphql";
import { getClient } from "../../lib/client";

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

export const Login = async (
  email: string,
  password: string
): Promise<{
  user: RegularUserInfoFragment | null | undefined;
  errors: readonly RegularErrorFragment[] | null | undefined;
}> => {
  const { data } = await getClient().mutate({
    mutation: LoginDocument,
    variables: {
      email,
      password,
    },
  });

  const login = useFragment(RegularUserResponseFragmentDoc, data!.login);
  const user = useFragment(RegularUserInfoFragmentDoc, login.user);
  const errors = useFragment(RegularErrorFragmentDoc, login.errors);

  return { user, errors };
};
