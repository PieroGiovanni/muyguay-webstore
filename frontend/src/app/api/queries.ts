import { useFragment } from "../../generated/graphql/fragment-masking";
import {
  GetProductCategoriesDocument,
  GetProductDocument,
  GetProductsDocument,
  ProductCategoryPropsFragment,
  ProductCategoryPropsFragmentDoc,
  ProductPropsFragment,
  ProductPropsFragmentDoc,
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
  const { data } = await getClient().query({
    query: GetProductDocument,
    variables: { getProductId: id },
  });
  return useFragment(ProductPropsFragmentDoc, data.getProduct);
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
