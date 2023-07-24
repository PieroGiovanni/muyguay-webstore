import { extractPublicId } from "cloudinary-build-url";
import { AddToBagButton } from "../../../components/Buttons/AddToBagButton";
import { GetProduct } from "../../api/";
import { ProductImage } from "../../../components/ProductImage";
import { Card } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";

interface pageProps {
  params: { id: string };
}

const Page = async ({ params }: pageProps) => {
  const product = await GetProduct(parseInt(params.id));

  return product ? (
    <div className="pt-16 flex flex-col space-y-5 items-center">
      <Card className="p-5 flex flex-col gap-5">
        <ProductImage
          productPublicId={extractPublicId(product.images[0].imageUrl)}
        />
        <div className="flex gap-x-5 text-xl">
          <Label className="text-xl font-bold">
            {product.name.toUpperCase()}
          </Label>
          <Label className="text-xl">S/. {product.price}</Label>
        </div>
        <p>
          {product.description
            ? product.description
            : "descripción a del producto"}
        </p>
        <div className="flex justify-around">
          <Button>Comprar</Button>
          <AddToBagButton product={product} />
          {/* <Button>Seguir Mirando</Button> */}
        </div>
      </Card>
      <Link href={`/tienda`}>
        <Button className="w-20">
          <Undo2 />
        </Button>
      </Link>
    </div>
  ) : null;
};

export default Page;
