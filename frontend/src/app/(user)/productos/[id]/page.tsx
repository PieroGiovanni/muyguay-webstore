import { extractPublicId } from "cloudinary-build-url";
import { AddToBagButton } from "../../../../components/Buttons/AddToBagButton";
import { ProductImage } from "../../../../components/ProductImage";
import { Card } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { getProduct } from "../../../api/queries";

interface pageProps {
  params: { id: string };
}

const Page = async ({ params }: pageProps) => {
  const product = await getProduct(parseInt(params.id));

  return product ? (
    <div className="pt-16 flex flex-col space-y-5 items-center">
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
          <Link href={`/tienda`}>
            <Button className="flex items-center gap-1">
              <Undo2 />
              <p>Tienda</p>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  ) : null;
};

export default Page;
