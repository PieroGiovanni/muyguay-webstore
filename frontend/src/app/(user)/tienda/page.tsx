import { Shop } from "../../../components/Shop";
import {
  getFilteredProducts,
  getProductCategories,
  getProducts,
} from "../../api/queries";

interface PageProps {
  searchParams?: {
    query?: string;
    categoryId?: string;
    orderBy?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // const products = await getProducts();
  const categories = await getProductCategories();

  const query = searchParams?.query;
  const categoryId =
    searchParams?.categoryId && !isNaN(parseInt(searchParams.categoryId))
      ? parseInt(searchParams.categoryId)
      : undefined;
  const orderBy = searchParams?.orderBy;

  const filteredProducts = await getFilteredProducts(
    query,
    categoryId,
    orderBy
  );

  return categories && filteredProducts ? (
    <div className="pt-16">
      <Shop categories={categories} products={filteredProducts} />
    </div>
  ) : null;
};
export default Page;
