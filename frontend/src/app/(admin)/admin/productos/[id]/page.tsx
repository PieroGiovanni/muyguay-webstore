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
  const categories = await getProductCategories();
  const brands = await getBrands();
  return (
    <div className="flex justify-center">
      <UpdateProductForm
        productId={parseInt(params.id)}
        categories={categories}
        brands={brands}
      />
    </div>
  );
};
export default Page;
