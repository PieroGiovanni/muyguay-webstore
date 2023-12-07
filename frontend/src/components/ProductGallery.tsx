"use client";

import { extractPublicId } from "cloudinary-build-url";
import { CldImage } from "next-cloudinary";
import { Suspense, startTransition, useState } from "react";
import { ProductPropsFragment } from "../graphql/generated/graphql";
import { Card } from "./ui/card";
import { LoadingSpinner } from "./LoadingSpinner";

interface ProductGalleryProps {
  product: ProductPropsFragment;
}

export const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [selectedImage, setselectedImage] = useState<string>(
    extractPublicId(product.images[0].imageUrl!)
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);

  const handleOnClick = (url: string) => () => {
    startTransition(() => {
      setselectedImage(extractPublicId(url));
      setIsImageLoaded(false);
    });
  };

  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="md:w-[30vw] w-[90vw] relative aspect-square">
        {!isImageLoaded && <LoadingSpinner />}
        <CldImage
          src={selectedImage}
          alt={selectedImage}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 33vw"
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>

      {product.images.length > 1 ? (
        <div className="flex gap-3 overflow-y-visible shrink-0 justify-center">
          {product.images.map((image) => {
            let isSelected =
              selectedImage === extractPublicId(image.imageUrl!)
                ? "ring-offset-2 ring-2 ring-black"
                : "";
            return (
              <div
                key={image.imageUrl}
                className={`w-[25%] rounded-sm aspect-square relative ${isSelected}`}
              >
                {!isThumbnailLoaded && <LoadingSpinner size="sm" />}
                <CldImage
                  className="rounded-md"
                  src={extractPublicId(image.imageUrl!)}
                  alt={extractPublicId(image.imageUrl!)}
                  fill
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 8vw, 8vw"
                  onClick={handleOnClick(image.imageUrl!)}
                  onLoad={() => setIsThumbnailLoaded(true)}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </Card>
  );
};
