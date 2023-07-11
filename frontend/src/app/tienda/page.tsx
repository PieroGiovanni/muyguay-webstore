import { useSession } from "next-auth/react";
import { Shop } from "../../components/Shop";
import { GetProductCategories, GetProducts } from "../api/queries";
import { redirect } from "next/dist/server/api-utils";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const products = await GetProducts();
  const categories = await GetProductCategories();

  return categories ? (
    <div className="pt-16">
      <Shop categories={categories} products={products} />
    </div>
  ) : null;
};
export default Page;
