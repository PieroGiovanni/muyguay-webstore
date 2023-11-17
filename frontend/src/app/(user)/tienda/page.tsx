export const dynamic = "force-dynamic";

import { FilterButton } from "../../../components/Buttons/FilterButton";
import { ProductList } from "../../../components/ProductList";
import { SearchProduct } from "../../../components/SearchProduct";
import { getProductCategories } from "../../api/queries";

interface PageProps {
  searchParams: {
    query?: string;
    categoryId?: string;
    orderBy?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const categories = await getProductCategories();

  return (
    <div className="pt-20 pb-5">
      <div className="flex w-full gap-2 items-center px-4">
        <SearchProduct />
        <p>Filtrar:</p>
        <FilterButton categories={categories} />
      </div>
      <ProductList searchParams={searchParams} />
    </div>
  );
};
export default Page;
