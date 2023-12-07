import { CldImage } from "next-cloudinary";
import { Card } from "./ui/card";
import { extractPublicId } from "cloudinary-build-url";
import { Dispatch, SetStateAction, useCallback } from "react";
import { UploadWidget } from "./UploadWidget";

interface ImagesUploaderProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

export const ImagesUploader = ({ images, setImages }: ImagesUploaderProps) => {
  const handleDeleteImage = (image: string) => () => {
    setImages((prevImages) => prevImages.filter((pi) => pi !== image));
  };

  const handleUploadImage = useCallback(
    (images: string[]) => {
      setImages((prevImages) => {
        const prevItemsSet = new Set(prevImages);
        const newImages = images.filter((image) => !prevItemsSet.has(image));
        return [...prevImages, ...newImages];
      });
    },
    [setImages]
  );
  return (
    <div className="flex md:flex-row flex-col items-center gap-2">
      <Card className="flex h-[70px] w-[100%] gap-2 md:basis-[95%] overflow-x-auto">
        {images.map((image) => (
          <div
            key={image}
            className="flex items-center gap-2 w-[70px] aspect-square relative shrink-0"
          >
            <CldImage
              src={extractPublicId(image)}
              alt={extractPublicId(image)}
              fill
              sizes="(max-width: 768px) 30vw, (max-width: 1200px) 8vw, 8vw"
            />
            <button
              className="absolute top-0 right-0 bg-white border-2 border-black font-bold text-black text-xs rounded-full w-6 aspect-square"
              onClick={handleDeleteImage(image)}
            >
              x
            </button>
          </div>
        ))}
      </Card>

      <UploadWidget handleImagesUrl={handleUploadImage} />
    </div>
  );
};
