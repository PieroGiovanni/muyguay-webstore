import { Shop } from "../../components/Shop";
import { GetProductCategories, GetProducts } from "../api/queries";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const products = await GetProducts();
  const categories = await GetProductCategories();

  return categories && products ? (
    <div className="pt-16">
      <Shop categories={categories} products={products} />
    </div>
  ) : null;
};
export default Page;
