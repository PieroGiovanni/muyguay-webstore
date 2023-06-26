"use client";

import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Navbar } from "../components/Navbar";
import { Showcase } from "../components/Showcase";
import { VerProdcutsButton } from "../components/VerProdcutsButton";

const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default function Home() {
  return (
    <Provider value={client}>
      <>
        <div className="flex flex-col bg-[url('/4.webp')] h-screen bg-cover max-h-screen">
          <Navbar />
          <div className="flex-grow grid grid-rows-6">
            <div className="flex row-start-6 justify-center">
              <VerProdcutsButton />
            </div>
          </div>
        </div>
        <div className="flex h-screen bg-white">
          <Showcase />
        </div>
      </>
    </Provider>
  );
}
