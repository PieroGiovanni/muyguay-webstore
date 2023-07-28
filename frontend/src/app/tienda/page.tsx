import { Shop } from "../../components/Shop";
import { getProductCategories, getProducts } from "../api/queries";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const products = await getProducts();
  const categories = await getProductCategories();

  return categories && products ? (
    <div className="pt-16">
      <Shop categories={categories} products={products} />
    </div>
  ) : null;
};
export default Page;
