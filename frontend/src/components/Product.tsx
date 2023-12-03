import Link from "next/link";
import { ProductPropsFragment } from "../graphql/generated/graphql";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Suspense, lazy, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { CldImage } from "next-cloudinary";
import { extractPublicId } from "cloudinary-build-url";
import { AddToBag } from "../app/utils/addToBag";
import { useBagContext } from "../app/context/bagContext";

interface ProductProps {
  product: ProductPropsFragment;
}

export const Product = ({ product }: ProductProps) => {
  const { bagProducts, setBagProducts } = useBagContext();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const createHandleLoad = () => () => setIsImageLoaded(true);

  return (
    <div className="relative w-full">
      <Link href={`/productos/${product.id}`}>
        <Card className="flex flex-col rounded-sm">
          <Label className="flex text-xs md:text-base text-center justify-center ">
            {product.name}
          </Label>
          <div className="relative w-full aspect-square">
            {!isImageLoaded && <LoadingSpinner />}

            <CldImage
              src={
                product.images[0].imageUrl
                  ? extractPublicId(product.images[0].imageUrl!)
                  : "/image-not-found.webp"
              }
              alt={product.name}
              onLoad={createHandleLoad}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 33vw"
            />
          </div>
          <Label className="flex text-lg ml-2 font-bold">
            S/. {product.price}
          </Label>
        </Card>
      </Link>
      {/* ShoppingBag Button*/}
      <div className="absolute bottom-1 right-1">
        <button
          className="rounded-full relative border-2 border-black w-10 h-10 md:w-[65px] md:h-[65px] items-center flex justify-center bg-white"
          onClick={() => AddToBag(product, bagProducts, setBagProducts)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:w-10 md:h-10"
            overflow="visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />

            <circle
              cx="18"
              cy="19"
              r="6"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text x="14" y="23" fontSize="13" className="font-thin">
              +
            </text>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Product;
