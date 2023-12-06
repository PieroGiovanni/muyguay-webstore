"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { ProductCategoryPropsFragment } from "../graphql/generated/graphql";

interface CategoriesAccessProps {
  categories: readonly ProductCategoryPropsFragment[];
}

export const CategoriesAccess = ({ categories }: CategoriesAccessProps) => {
  const router = useRouter();

  const handleCategory = (id: number) => {
    router.push(`/tienda?categoryId=${id}`);
  };
  return (
    categories && (
      <div className="grid grid-cols-2 gap-0.5">
        {[...categories]
          .sort((a, b) => a.id - b.id)
          .map((c) => (
            <Button
              className="h-20 md:text-xl bg-secondary"
              onClick={() => handleCategory(c.id)}
              key={c.id}
            >
              {c.name.toUpperCase()}
            </Button>
          ))}
      </div>
    )
  );
};
