import { GetProductsDocument } from "../../generated/graphql/graphql";
import { getClient } from "../../lib/client";

export const getProducts = async () => {
  const { data } = await getClient().query({
    query: GetProductsDocument,
  });
  return data;
};
