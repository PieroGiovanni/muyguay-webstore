import { ScrollDownButton } from "../../components/Buttons/ScrollDownButton";
import { VerProductsButton } from "../../components/Buttons/VerProductsButton";
import { CategoriesAccess } from "../../components/CategoriesAccess";
import { Showcase } from "../../components/Showcase";
import {
  getFeaturedProducts,
  getNewProducts,
  getProductCategories,
} from "../api/queries";

export default async function Home() {
  const categories = await getProductCategories();
  const featuredProducts = await getFeaturedProducts();
  const newProducts = await getNewProducts(8);

  return featuredProducts && newProducts ? (
    <>
      <div className="flex flex-col bg-[url('/4.webp')] sm:bg-[url('/3.webp')] w-full h-[100svh] bg-cover pt-0 overflow-x-hidden">
        {/* Button for the bottom left quarter (desktop) */}
        <div className="hidden md:flex sm:flex-col absolute  left-0 w-1/2 h-screen items-center justify-center gap-10">
          <p className="text-5xl text-justify pl-10 ">
            Eleva tu resplandor con nuestra colección de belleza y estilo.
          </p>
          <VerProductsButton />
        </div>

        {/* Button for the bottom half centered horizontally (mobile) */}
        <div className="flex flex-col md:hidden h-full w-full justify-center items-center pt-72">
          <VerProductsButton />
        </div>
        <div className="flex absolute right-0 left-0 justify-center items-center bottom-0">
          <ScrollDownButton />
        </div>
      </div>

      <div className="flex bg-white">
        <Showcase
          featuredProducts={featuredProducts}
          newProducts={newProducts}
        />
      </div>
      <div className="pt-4">
        <CategoriesAccess categories={categories} />
      </div>
    </>
  ) : (
    <div>loading...</div>
  );
}
