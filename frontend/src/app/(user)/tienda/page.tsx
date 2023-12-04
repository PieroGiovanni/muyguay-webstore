export const dynamic = "force-dynamic";

import { Suspense, lazy } from "react";
import { getProductCategories } from "../../api/queries";
import { PrefetchQuery } from "../../../components/QueryComponents/PrefetchQuery";
import { GetFilteredProductsDocument } from "../../../graphql/generated/graphql";
import { LoadingSkeleton } from "../../../components/LoadingSkeleton";
import { LoadingSpinner } from "../../../components/LoadingSpinner";

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
    limit: 28,
  };

  return (
    <div className="pt-20 pb-5">
      <div className="flex w-full gap-2 items-center px-4">
        <SearchProduct />
        <p>Filtrar:</p>
        <FilterButton categories={categories} />
      </div>
      <Suspense
        fallback={
          <div className="mt-20">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
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
