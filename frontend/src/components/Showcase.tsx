"use client";

import { ProductPropsFragment } from "../graphql/generated/graphql";
import { ShowcaseFeaturedContent } from "./ShowcaseFeaturedContent";
import { ShowcaseNewContent } from "./ShowcaseNewContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
