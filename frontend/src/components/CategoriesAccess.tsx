"use client";

import { useRouter } from "next/navigation";
import { useCategoryContext } from "../app/context/categoryContext";
import { Button } from "./ui/button";

interface CategoriesAccessProps {}

export const CategoriesAccess = ({}: CategoriesAccessProps) => {
  const { categoryId, setCategoryId } = useCategoryContext();
  const router = useRouter();

  const handleCategory = (id: number) => {
    setCategoryId(id);
    router.push("/tienda");
  };
  return (
    <div className="flex flex-col">
      <Button className="h-20" onClick={() => handleCategory(1)}>
        Ropa
      </Button>
      <Button className="h-20" onClick={() => handleCategory(2)}>
        Maquillaje
      </Button>
      <Button className="h-20" onClick={() => handleCategory(3)}>
        Joyería
      </Button>
      <Button className="h-20" onClick={() => handleCategory(4)}>
        Belleza
      </Button>
      <Button className="h-20" onClick={() => handleCategory(5)}>
        Accesorios
      </Button>
    </div>
  );
};
