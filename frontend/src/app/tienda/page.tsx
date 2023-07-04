import { Shop } from "../../components/Shop";
import { GetProductCategories, GetProducts } from "../api/queries";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const products = await GetProducts();
  // const SearchProducts = async (searchText: string, categoryId?: number) => {
  //   "use server";
  //   const products = await GetProducts();

  //   const filteredByName = products.filter((p) =>
  //     p.name.toLowerCase().includes(searchText.toLowerCase())
  //   );

  //   return !categoryId
  //     ? filteredByName
  //     : filteredByName.filter(
  //         (p) => p.productType.productCategoryId === categoryId
  //       );
  // };
  const categories = await GetProductCategories();

  return categories ? (
    <div>
      <Shop categories={categories} products={products} />
    </div>
  ) : null;
};
export default Page;
