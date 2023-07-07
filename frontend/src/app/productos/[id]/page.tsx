import { AddToBagButton } from "../../../components/AddToBagButton";
import { GetProduct } from "../../api/queries";

interface pageProps {
  params: { id: string };
}

const Page = async ({ params }: pageProps) => {
  const product = await GetProduct(parseInt(params.id));

  return product ? (
    <div className="pt-16">
      {product.name}
      <AddToBagButton product={product} />
    </div>
  ) : null;
};

export default Page;
