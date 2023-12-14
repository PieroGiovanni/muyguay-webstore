import { extractPublicId } from "cloudinary-build-url";
import { AddToBagButton } from "../../../../components/Buttons/AddToBagButton";

import { Suspense, lazy } from "react";
import { BackButton } from "../../../../components/Buttons/BackButton";
import { Card } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { getProduct } from "../../../api/queries";
import { ProductGallery } from "../../../../components/ProductGallery";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import { Metadata, ResolvingMetadata } from "next";

interface pageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const product = await getProduct(parseInt(params.id));

  return {
    title: product.name,
    openGraph: {
      images: { url: product.images[0].imageUrl!, width: 400, height: 400 },
      title: product.name,
      description: "S/. " + product.price,
      siteName: "Muy Guay",
    },
  };
}

const Page = async ({ params }: pageProps) => {
  const product = await getProduct(parseInt(params.id));

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="pt-[58px] w-[100%] md:h-[100vh] flex md:flex-row flex-col justify-center gap-5 items-center">
        <ProductGallery product={product} />
        <div className="flex flex-col gap-5 md:basis-2/6">
          <div className="flex gap-x-5 text-xl items-center">
            <Label className="basis-4/5 md:text-xl text-lg font-bold text-center">
              {product.name.toUpperCase()}
            </Label>
            <Label className="basis-1/5 text-xl">S/. {product.price}</Label>
          </div>
          <div className="whitespace-pre-line pl-3">
            {product.description
              ? product.description
              : "descripción del producto"}
          </div>
          <div className="flex relative bottom-0 justify-center gap-5 md:gap-10">
            <AddToBagButton product={product} />
            <BackButton />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
