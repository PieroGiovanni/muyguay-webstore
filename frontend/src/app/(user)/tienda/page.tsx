export const dynamic = "force-dynamic";

import { Suspense, lazy } from "react";
import { getProductCategories } from "../../api/queries";
import { PrefetchQuery } from "../../../components/QueryComponents/PrefetchQuery";
import { GetFilteredProductsDocument } from "../../../graphql/generated/graphql";

const FilterButton = lazy(
  () => import("../../../components/Buttons/FilterButton")
);

const ProductList = lazy(() => import("../../../components/ProductList"));

const SearchProduct = lazy(() => import("../../../components/SearchProduct"));

interface PageProps {
  searchParams: {
    query?: string;
    categoryId?: string;
    orderBy?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const categories = await getProductCategories();
  let variables = {
    ...searchParams,
    limit: process.env.NODE_ENV === "development" ? 8 : 28,
  };

  return (
    <div className="pt-20 pb-5">
      <Suspense>
        <div className="flex w-full gap-2 items-center px-4">
          <SearchProduct />
          <p>Filtrar:</p>
          <FilterButton categories={categories} />
        </div>
        <PrefetchQuery
          variables={variables}
          query={GetFilteredProductsDocument}
        >
          <ProductList variables={variables} />
        </PrefetchQuery>
      </Suspense>
    </div>
  );
};
export default Page;
