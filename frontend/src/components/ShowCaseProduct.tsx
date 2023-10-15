import Link from "next/link";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { CldImage } from "next-cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import { ProductPropsFragment } from "../graphql/generated/graphql";

interface ShowCaseProductProps {
  product: ProductPropsFragment;
}

export const ShowCaseProduct = ({ product }: ShowCaseProductProps) => {
  return (
    <Link
      key={product.id}
      href={`/productos/${product.id}`}
      className="flex flex-col shrink-0 w-1/2 md:w-1/4 sm:w-1/3"
    >
      <Card className="flex flex-col">
        <Label className="text-xs md:text-base text-center">
          {product.name}
        </Label>
        <div className="flex w-full relative md:h-[50vh] h-48">
          <CldImage
            src={extractPublicId(product.images[0].imageUrl!)}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 33vw"
          />
        </div>

        <Label className="hover:cursor-pointer text-lg text-center font-bold">
          S/.{product.price}
        </Label>
      </Card>
    </Link>
  );
};
