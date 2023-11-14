import { Shop } from "../../../components/Shop";
import { getProductCategories } from "../../api/queries";

interface PageProps {
  searchParams?: {
    query?: string;
    categoryId?: string;
    orderBy?: string;
    cursor?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const categories = await getProductCategories();

  return categories ? (
    <div className="pt-20 pb-5">
      <Shop categories={categories} searchParams={searchParams} />
    </div>
  ) : null;
};
export default Page;
