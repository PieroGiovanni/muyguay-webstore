"use client";

import { extractPublicId } from "cloudinary-build-url";
import { CldImage } from "next-cloudinary";
import { GetImagesQuery } from "../generated/graphql/graphql";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ShowcaseProps {
  images?: GetImagesQuery;
}

export function Showcase({ images }: ShowcaseProps) {
  images?.getImages.map((images) => {
    console.log(images.imageUrl);
    console.log(extractPublicId(images.imageUrl));
  });

  return (
    <div>
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="new">Lo Nuevo</TabsTrigger>
          <TabsTrigger value="mostSold">Lo más vendido</TabsTrigger>
        </TabsList>
        <TabsContent
          value="featured"
          // className="w-full flex flex-row overflow-x-auto bg-red-800"
        >
          <Card className="w-ful">
            <div className="w-full h-full flex flex-row overflow-x-scroll items-center">
              {/* <div className="h-[50vh flex-row flex overflow-x-scroll bg-red-600"> */}
              {images?.getImages.map((i) => (
                <div
                  className="flex-shrink-0 p-2 flex flex-col justify-center items-center space-y-1 h-[30vh]"
                  key={i.id}
                >
                  <CldImage
                    src={extractPublicId(i.imageUrl)}
                    alt={i.imageUrl}
                    width={200}
                    height={200}
                  />
                  <Label>{i.product.name}</Label>

                  <Label className="text-lg">s/. {i.product.price}</Label>
                </div>
              ))}
            </div>
            {/* </div> */}
          </Card>
        </TabsContent>
        <TabsContent value="new">new content</TabsContent>
        <TabsContent value="mostSold">most sold</TabsContent>
      </Tabs>
    </div>
  );
}
