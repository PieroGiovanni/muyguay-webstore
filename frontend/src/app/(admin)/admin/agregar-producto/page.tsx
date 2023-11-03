import { AddProductForm } from "../../../../components/AddProductForm";
import { getBrands, getProductCategories } from "../../../api/queries";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const brands = await getBrands();
  const productCategories = await getProductCategories();

  return (
    <AddProductForm brands={brands} productCategories={productCategories} />
  );
};

export default Page;
