import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Showcase } from "../components/Showcase";
import { VerProdcutsButton } from "../components/VerProdcutsButton";
import {
  GetImagesDocument,
  GetProductsDocument,
} from "../generated/graphql/graphql";
import { getClient } from "../lib/client";

export default async function Home() {
  const { data: products } = await getClient().query({
    query: GetProductsDocument,
  });

  // console.log("FROM PAGE: ", products.getProducts);

  return products ? (
    <>
      <div className="flex flex-col bg-[url('/4.webp')] h-screen bg-cover max-h-screen">
        <Navbar />
        <div className="flex-grow grid grid-rows-6">
          <div className="flex row-start-5 pt-10 justify-center">
            <VerProdcutsButton />
          </div>
        </div>
      </div>
      <div className="flex h-screen bg-white">
        <Showcase getProducts={products.getProducts} />
      </div>
    </>
  ) : null;
}
