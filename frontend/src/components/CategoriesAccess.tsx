"use client";

import { useRouter } from "next/navigation";
import { useCategoryContext } from "../app/context/categoryContext";
import { Button } from "./ui/button";

interface CategoriesAccessProps {}

export const CategoriesAccess = ({}: CategoriesAccessProps) => {
  const { setCategoryId } = useCategoryContext();
  const router = useRouter();

  const handleCategory = (id: number) => {
    setCategoryId(id);
    router.push("/tienda");
  };
  return (
    <div className="grid grid-cols-2 gap-0.5">
      <Button className="h-20 md:text-xl" onClick={() => handleCategory(1)}>
        Ropa
      </Button>
      <Button className="h-20 md:text-xl" onClick={() => handleCategory(2)}>
        Maquillaje
      </Button>
      <Button className="h-20 md:text-xl" onClick={() => handleCategory(3)}>
        Joyería
      </Button>
      <Button className="h-20 md:text-xl" onClick={() => handleCategory(4)}>
        Belleza
      </Button>
      <Button className="h-20 md:text-xl" onClick={() => handleCategory(5)}>
        Accesorios
      </Button>
      <Button className="h-20 md:text-xl" onClick={() => handleCategory(6)}>
        Calzado
      </Button>
    </div>
  );
};
