"use client";

import { extractPublicId } from "cloudinary-build-url";
import { CldImage } from "next-cloudinary";
import { Suspense, useState } from "react";
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
        <div className="flex gap-3">
          {product.images.map((image) => {
            let isSelected =
              selectedImage === extractPublicId(image.imageUrl!)
                ? "outline outline-offset-1 outline-3 outline-black"
                : "";
            return (
              <div
                key={image.imageUrl}
                className={`w-[25%] rounded-sm aspect-square relative ${isSelected}`}
              >
                <CldImage
                  className="rounded-md"
                  src={extractPublicId(image.imageUrl!)}
                  alt={extractPublicId(image.imageUrl!)}
                  fill
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 8vw, 8vw"
                  onClick={() =>
                    setselectedImage(extractPublicId(image.imageUrl!))
                  }
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </Card>
  );
};