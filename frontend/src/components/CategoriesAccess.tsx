"use client";

import { useRouter } from "next/navigation";
import { useCategoryContext } from "../app/context/categoryContext";
import { Button } from "./ui/button";
import { ProductCategoryPropsFragment } from "../graphql/generated/graphql";

interface CategoriesAccessProps {
  categories: readonly ProductCategoryPropsFragment[];
}

export const CategoriesAccess = ({ categories }: CategoriesAccessProps) => {
  const { setCategoryId } = useCategoryContext();
  const router = useRouter();

  const handleCategory = (id: number) => {
    setCategoryId(id);
    router.push("/tienda");
  };
  return (
    categories && (
      <div className="grid grid-cols-2 gap-0.5">
        {[...categories]
          .sort((a, b) => a.id - b.id)
          .map((c) => (
            <Button
              className="h-20 md:text-xl"
              onClick={() => handleCategory(c.id)}
              key={c.id}
            >
              {c.name}
            </Button>
          ))}
      </div>
    )
  );
};
