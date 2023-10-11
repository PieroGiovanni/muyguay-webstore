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
import { ShowCaseProduct } from "./ShowCaseProduct";
import { useEffect, useRef, useState } from "react";
import { ArrowBigLeft, ArrowBigRight, ArrowRight } from "lucide-react";
import { ScrollLeftButton } from "./Buttons/ScrollLeftButton";
import { ScrollRightButton } from "./Buttons/ScrollRightButton";
import { ShowcaseFeaturedContent } from "./ShowcaseFeaturedContent";
import { ShowcaseNewContent } from "./ShowcaseNewContent";

interface ShowcaseProps {
  products: readonly ProductPropsFragment[];
}

export const Showcase = ({ products }: ShowcaseProps) => {
  return (
    <Tabs defaultValue="featured" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="sm:text-lg" value="featured">
          Destacados
        </TabsTrigger>
        <TabsTrigger className="sm:text-lg" value="new">
          Lo Nuevo
        </TabsTrigger>
        <TabsTrigger className="sm:text-lg" value="mostSold" disabled>
          Lo más vendido
        </TabsTrigger>
      </TabsList>
      <TabsContent value="featured">
        <ShowcaseFeaturedContent products={products} />
      </TabsContent>
      <TabsContent value="new">
        <ShowcaseNewContent products={products} />
      </TabsContent>
      <TabsContent value="mostSold">Pronto</TabsContent>
    </Tabs>
  );
};
