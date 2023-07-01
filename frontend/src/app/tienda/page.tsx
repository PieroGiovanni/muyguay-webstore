import { ProductsSearchBar } from "../../components/ProductsSearchBar";
import { useFragment } from "../../generated/graphql/fragment-masking";
import {
  GetProductsDocument,
  Product,
  ProductPropsFragment,
  ProductPropsFragmentDoc,
} from "../../generated/graphql/graphql";
import { getClient } from "../../lib/client";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const {
    data: { getProducts },
  } = await getClient().query({
    query: GetProductsDocument,
  });

  const products = useFragment(ProductPropsFragmentDoc, getProducts);

  const handleOnchangeFilterProducts = async (filter: string) => {
    "use server";
    console.log(filter);
    return products.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <div>
      <ProductsSearchBar handleOnChange={handleOnchangeFilterProducts} />
      {products.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};
export default Page;
