import { FilterButton } from "../../../components/Buttons/FilterButton";
import { SearchProduct } from "../../../components/SearchProduct";
import { ProductList } from "../../../components/ProductList";
import { fetchFilteredProducts, getProductCategories } from "../../api/queries";

interface PageProps {
  searchParams?: {
    query?: string;
    categoryId?: string;
    orderBy?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const categories = await getProductCategories();

  const products = await fetchFilteredProducts({
    query: searchParams?.query,
    categoryId: searchParams?.categoryId,
    orderBy: searchParams?.orderBy,
  });

  return categories ? (
    <div className="pt-20 pb-5">
      <div className="flex w-full gap-2 items-center px-4">
        <SearchProduct />
        <FilterButton categories={categories} />
      </div>
      <ProductList categories={categories} initailProducts={products} />
    </div>
  ) : null;
};
export default Page;
