import { extractPublicId } from "cloudinary-build-url";
import { AddToBagButton } from "../../../../components/Buttons/AddToBagButton";

import { Suspense, lazy } from "react";
import { BackButton } from "../../../../components/Buttons/BackButton";
import { Card } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { getProduct } from "../../../api/queries";

const ProductImage = lazy(() => import("../../../../components/ProductImage"));

interface pageProps {
  params: { id: string };
}

const Page = async ({ params }: pageProps) => {
  const product = await getProduct(parseInt(params.id));

  return (
    <div className="pt-16 flex flex-col space-y-5 items-center">
      <Suspense>
        <Card className="p-5 flex flex-col gap-5">
          <ProductImage
            productPublicId={extractPublicId(product.images[0].imageUrl!)}
          />
          <div className="flex gap-x-5 text-xl">
            <Label className="text-xl font-bold">
              {product.name.toUpperCase()}
            </Label>
            <Label className="text-xl">S/. {product.price}</Label>
          </div>
          <div className="whitespace-pre-line">
            {product.description
              ? product.description
              : "descripción del producto"}
          </div>
          <div className="flex justify-around">
            <AddToBagButton product={product} />
            <BackButton />
          </div>
        </Card>
      </Suspense>
    </div>
  );
};

export default Page;
