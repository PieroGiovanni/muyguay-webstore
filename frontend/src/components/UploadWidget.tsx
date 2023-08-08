import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface UploadWidgetProps {}

export const UploadWidget = ({}: UploadWidgetProps) => {
  const [loaded, setLoaded] = useState(false);
  const [cloudName, setCloudName] = useState("dax2ssfpm");
  const [unsignedPreset, setUnsignedPreset] = useState("muyguay-webstore");
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
      console.log("success", result.info.secure_url);
      setUploadedImage(result.info.secure_url);
    }
  };

  const uploadWidget = () => {
    //@ts-ignore
    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        upladPreset: unsignedPreset,
        sources: ["local", "url"],
      },
      proccessResults
    );
  };

  return (
    <div>
      <Button onClick={uploadWidget}>Subir Imagen</Button>
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
