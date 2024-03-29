"use client";

import { SlidersHorizontal } from "lucide-react";
import { capitalizeFirstLetter } from "../../app/utils/stringUtils";
import { ProductCategoryPropsFragment } from "../../graphql/generated/graphql";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterButtonProps {
  categories: readonly ProductCategoryPropsFragment[];
}

export const FilterButton = ({ categories }: FilterButtonProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleCategoryChange = (id: string) => {
    if (id !== "all" && id) {
      params.set("categoryId", id);
    } else {
      params.delete("categoryId");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleOrderBy = (order: string) => {
    if (order) {
      params.set("orderBy", order);
    } else {
      params.delete("orderByDate");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="text-xs">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-10">
            <SlidersHorizontal className="shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-xs">
          <Accordion type="multiple" defaultValue={["category", "orderBy"]}>
            <AccordionItem value="category" className="w-full">
              <AccordionTrigger>Elegir Categoría</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue={
                    searchParams.get("categoryId")?.toString() || "all"
                  }
                  onValueChange={(value) => {
                    handleCategoryChange(value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="todo" />
                    <Label htmlFor="todo" className="text-xs">
                      Todo
                    </Label>
                  </div>
                  {categories.map((c) => (
                    <div key={c.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={c.id.toString()} id={c.name} />
                      <Label htmlFor={c.name} className="text-xs">
                        {capitalizeFirstLetter(c.name)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="orderBy" className="w-full">
              <AccordionTrigger>Ordenar por:</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue={
                    searchParams.get("orderBy")?.toString() || "new"
                  }
                  onValueChange={(value) => {
                    handleOrderBy(value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">Lo más nuevo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="old" id="old" />
                    <Label htmlFor="old">Lo más antiguo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="less-expensive" id="cheap" />
                    <Label htmlFor="cheap">Menor Precio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="most-expensive" id="expensive" />
                    <Label htmlFor="expensive">Mayor Precio</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterButton;
