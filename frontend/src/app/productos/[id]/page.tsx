import { GetProductDocument } from "../../../generated/graphql/graphql";
import { getClient } from "../../../lib/client";

interface pageProps {
  params: { id: string };
}

const Page = async ({ params }: pageProps) => {
  const { data: product } = await getClient().query({
    query: GetProductDocument,
    variables: { getProductId: parseInt(params.id) },
  });
  return <div>{product.getProduct.name}</div>;
};

export default Page;
