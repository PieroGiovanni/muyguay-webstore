import { useState } from "react";
import { Loading } from "./Loading";
import { CldImage } from "next-cloudinary";
import { ProductPropsFragment } from "../graphql/generated/graphql";
import { extractPublicId } from "cloudinary-build-url";

interface ShopImageProps {
  product: ProductPropsFragment;
}

export const ShopImage = ({ product }: ShopImageProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };
  return (
    <div className="relative h-[90%] bg-blue-700">
      {isImageLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      )}

      <CldImage
        src={
          product.images[0].imageUrl
            ? extractPublicId(product.images[0].imageUrl!)
            : "/image-not-found.webp"
        }
        alt={product.name}
        onLoad={handleImageLoad}
        style={{ opacity: isImageLoading ? 0 : 1 }}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 33vw"
        // sizes="(max-width: 768px) 30vw"
      />
    </div>
  );
};
