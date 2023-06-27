"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  GetImagesDocument,
  GetImagesQuery,
  GetProductsDocument,
} from "../generated/graphql/graphql";
import { getClient } from "../lib/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { extractPublicId } from "cloudinary-build-url";

interface ShowcaseProps {
  images: GetImagesQuery;
}

export async function Showcase({ images }: ShowcaseProps) {
  return (
    <>
      <Tabs defaultValue="featured" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="new">Lo Nuevo</TabsTrigger>
          <TabsTrigger value="mostSold">Lo más vendido</TabsTrigger>
        </TabsList>
        <TabsContent value="featured">
          <Card>
            <CardContent>
              {images.getImages.map((i) => (
                <CldImage
                  src={extractPublicId(i.imageUrl)}
                  key={i.id}
                  alt={i.imageUrl}
                  width={200}
                  height={200}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new">new content</TabsContent>
        <TabsContent value="mostSold">most sold</TabsContent>
      </Tabs>
    </>
  );
}
