"use client";

import { CldImage } from "next-cloudinary";

interface ProductImageProps {
  productPublicId: string;
}

export const ProductImage = ({ productPublicId }: ProductImageProps) => {
  return (
    <div className="md:w-[30vw] md:h-[30vw] w-[90vw] h-[90vw] relative">
      <CldImage
        src={productPublicId}
        alt={productPublicId}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 30vw, 33vw"
      />
    </div>
  );
};
