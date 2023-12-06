import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface UploadWidgetProps {
  handleImagesUrl: (imagesUrl: string[]) => void;
  resetImage?: boolean;
}

export const UploadWidget = ({ handleImagesUrl }: UploadWidgetProps) => {
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

  return (
    <Button type="button" onClick={uploadWidget}>
      <Upload />
    </Button>
  );
};
