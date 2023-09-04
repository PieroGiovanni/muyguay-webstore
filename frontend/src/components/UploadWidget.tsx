import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Label } from "./ui/label";

interface UploadWidgetProps {
  onImageUrl: (imageUrl: any) => void;
  resetImage?: boolean;
}

export const UploadWidget = ({ onImageUrl, resetImage }: UploadWidgetProps) => {
  const [loaded, setLoaded] = useState(false);
  // const [cloudName, setCloudName] = useState(
  //   process.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  // );
  // const [unsignedPreset, setUnsignedPreset] = useState(
  //   process.env.PULLIC_CLOUDINARY_PRESET
  // );
  const [uploadedImage, setUploadedImage] = useState();

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
      setUploadedImage(result.info.secure_url);
      onImageUrl(result.info.secure_url);
    }
  };

  const uploadWidget = () => {
    //@ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
        sources: ["local", "url"],
      },
      proccessResults
    );
  };

  useEffect(() => {
    if (resetImage) {
      setUploadedImage(undefined);
    }
  }, [resetImage]);

  // const uploadWidget = () => {
  //   //@ts-ignore
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloudName: "dax2ssfpm",
  //       uploadPreset: "muyguay-webstore",
  //       sources: ["local", "url"],
  //     },
  //     proccessResults
  //   );
  // };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Label>Subir Imagen: </Label>
        <Button type="button" onClick={uploadWidget}>
          <Upload />
        </Button>
      </div>
      {uploadedImage ? (
        <Image
          src={uploadedImage}
          alt="uploaded using the upload widget"
          width={200}
          height={200}
        />
      ) : null}
    </div>
  );
};
