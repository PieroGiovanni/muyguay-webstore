"use client";

import { extractPublicId } from "cloudinary-build-url";
import { CldImage } from "next-cloudinary";
import {
  GetProductsDocument,
  GetProductsQuery,
  ProductPropsFragmentDoc,
  ProductPropsFragment,
} from "../generated/graphql/graphql";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Link from "next/link";
import { getProducts } from "../app/api/queries";
import {
  FragmentType,
  useFragment,
} from "../generated/graphql/fragment-masking";

interface ShowcaseProps {
  getProducts: FragmentType<typeof ProductPropsFragmentDoc>[];
}

export const Showcase = ({ getProducts }: ShowcaseProps) => {
  const products = useFragment(ProductPropsFragmentDoc, getProducts);

  return (
    <div>
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="new">Lo Nuevo</TabsTrigger>
          <TabsTrigger value="mostSold">Lo más vendido</TabsTrigger>
        </TabsList>
        <TabsContent value="featured">
          <Card className="w-ful">
            <div className="w-full h-full flex flex-row overflow-x-scroll items-center">
              {products?.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.id}`}
                  className="flex-shrink-0 p-2 flex flex-col justify-center items-center space-y-1 h-[30vh]"
                >
                  <CldImage
                    src={extractPublicId(p.images[0].imageUrl)}
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
        <TabsContent value="new">new content</TabsContent>
        <TabsContent value="mostSold">most sold</TabsContent>
      </Tabs>
    </div>
  );
};
