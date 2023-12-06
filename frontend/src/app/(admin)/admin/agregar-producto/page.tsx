import { AddProductForm } from "../../../../components/AddProductForm";
import { getBrands, getProductCategories } from "../../../api/queries";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const brands = await getBrands();
  const productCategories = await getProductCategories();

  return (
    <div className="flex justify-center">
      <AddProductForm brands={brands} categories={productCategories} />
    </div>
  );
};

export default Page;
