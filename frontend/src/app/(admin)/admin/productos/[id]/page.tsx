import { UpdateProductForm } from "../../../../../components/UpdateProductForm";
import {
  getBrands,
  getProduct,
  getProductCategories,
} from "../../../../api/queries";

interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const product = await getProduct(parseInt(params.id));
  const categories = await getProductCategories();
  const brands = await getBrands();
  return (
    <div className="flex justify-center">
      <UpdateProductForm
        product={product}
        categories={categories}
        brands={brands}
      />
    </div>
  );
};
export default Page;
