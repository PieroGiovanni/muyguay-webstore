import { Shop } from "../../components/Shop";
import {
  GetProductsDocument,
  ProductPropsFragment,
} from "../../generated/graphql/graphql";
import { getClient } from "../../lib/client";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const searchProducts = async (searchText: string) => {
    "use server";
    const {
      data: { getProducts },
    } = await getClient().query({
      query: GetProductsDocument,
    });

    const products = getProducts as ProductPropsFragment[];

    console.log(searchText);
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };
  return (
    <div>
      <Shop searchProducts={searchProducts} />
    </div>
  );
};
export default Page;
