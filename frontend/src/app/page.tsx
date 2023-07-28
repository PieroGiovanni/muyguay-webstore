import { VerProdcutsButton } from "../components/Buttons/VerProdcutsButton";
import { Showcase } from "../components/Showcase";
import { getProducts } from "./api/queries";

export default async function Home() {
  const products = await getProducts();

  return products ? (
    <>
      <div className="flex flex-col bg-[url('/4.webp')] h-screen bg-cover pt-0">
        <div className="flex-grow grid grid-rows-6">
          <div className="flex row-start-5 pt-10 justify-center">
            <VerProdcutsButton />
          </div>
        </div>
      </div>
      <div className="flex h-screen bg-white">
        <Showcase products={products} />
      </div>
    </>
  ) : (
    <div>loading...</div>
  );
}
