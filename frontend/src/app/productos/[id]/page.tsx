import { GetProduct } from "../../api/queries";

interface pageProps {
  params: { id: string };
}

const Page = async ({ params }: pageProps) => {
  const product = await GetProduct(parseInt(params.id));

  return product ? <div>{product.name}</div> : null;
};

export default Page;
