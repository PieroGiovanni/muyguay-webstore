import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Label } from "./ui/label";

interface UploadWidgetProps {
  handleImagesUrl: (imageUrl: any) => void;
  resetImage?: boolean;
}

export const UploadWidget = ({
  handleImagesUrl,
  resetImage,
}: UploadWidgetProps) => {
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const cldScript = document.getElementById("cloudinaryUploadWidgetScript");
    if (typeof window !== "undefined" && !loaded && !cldScript) {
      const script = document.createElement("script");
      script.setAttribute("async", "");
      script.setAttribute("id", "cloudinaryUploadWidgetScript");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.addEventListener("load", () => setLoaded(true));
      document.body.appendChild(script);
    }
  }, [loaded]);

  const proccessResults = (error: any, result: any) => {
    if (error) {
      console.log("error", error);
    }

    if (result && result.event === "success") {
      console.log(result);
      console.log("success", result);
      setImages((prevImages) =>
        prevImages
          ? [...prevImages, result.info.secure_url]
          : [result.info.secure_url]
      );
    }
  };

  useEffect(() => {
    handleImagesUrl(images);
  }, [images, handleImagesUrl]);

  const uploadWidget = () => {
    //@ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        public_id: crypto.randomUUID(),
        sources: ["local", "url"],
        maxImageWidth: 1280,
        maxImageHeight: 1280,
        folder: "muyguay",
        multiple: true,
      },
      proccessResults
    );
  };

  useEffect(() => {
    if (resetImage) {
      setImages([]);
    }
  }, [resetImage]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Label>Subir Imagen: </Label>
        <Button type="button" onClick={uploadWidget}>
          <Upload />
        </Button>
      </div>
      {images.length > 0 ? (
        <div className="flex flex-row gap-2 mt-2">
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              alt="uploaded using the upload widget"
              width={200}
              height={200}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
