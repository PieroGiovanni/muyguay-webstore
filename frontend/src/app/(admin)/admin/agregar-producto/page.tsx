import { AddProductForm } from "../../../../components/Buttons/AddProductForm";
import { getBrands, getProductTypes } from "../../../api/queries";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const brands = await getBrands();
  const productTypes = await getProductTypes();

  return <AddProductForm brands={brands} productTypes={productTypes} />;
};

export default Page;
