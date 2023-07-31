"use client";

import { extractPublicId } from "cloudinary-build-url";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

import {
  ProductPropsFragment,
  ProductPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ShowcaseProps {
  products: readonly ProductPropsFragment[];
}

export const Showcase = ({ products }: ShowcaseProps) => {
  // const orderedProducts = [...pr].sort;
  return (
    <div>
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="new">Lo Nuevo</TabsTrigger>
          <TabsTrigger value="mostSold">Lo más vendido</TabsTrigger>
        </TabsList>
        <TabsContent value="featured">
          <Card>
            <div className="w-full h-full flex flex-row overflow-x-scroll items-center">
              {products
                ?.filter((p) => p.isFeatured)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/productos/${p.id}`}
                    className="flex-shrink-0 p-2 flex flex-col justify-center items-center space-y-1 h-[30vh]"
                  >
                    <CldImage
                      src={extractPublicId(p.images[0].imageUrl!)}
                      alt={p.name}
                      width={200}
                      height={200}
                    />
                    <Label>{p.name}</Label>

                    <Label className="text-lg">s/. {p.price}</Label>
                  </Link>
                ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <div className="w-full h-full flex flex-row overflow-x-scroll items-center">
              {[...products]
                .sort(
                  (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                )
                .slice(0, 5)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/productos/${p.id}`}
                    className="flex-shrink-0 p-2 flex flex-col justify-center items-center space-y-1 h-[30vh]"
                  >
                    <CldImage
                      src={extractPublicId(p.images[0].imageUrl!)}
                      alt={p.name}
                      width={200}
                      height={200}
                    />
                    <Label>{p.name}</Label>

                    <Label className="text-lg">s/. {p.price}</Label>
                  </Link>
                ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="mostSold">Pronto</TabsContent>
      </Tabs>
    </div>
  );
};
