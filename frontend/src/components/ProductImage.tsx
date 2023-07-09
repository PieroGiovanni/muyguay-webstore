"use client";

import { CldImage } from "next-cloudinary";

interface ProductImageProps {
  productPublicId: string;
}

export const ProductImage = ({ productPublicId }: ProductImageProps) => {
  return (
    <CldImage
      src={productPublicId}
      alt={productPublicId}
      width={500}
      height={500}
      sizes="90vw"
    />
  );
};
