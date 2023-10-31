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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";

interface FilterButtonProps {
  categories: readonly ProductCategoryPropsFragment[];
  handleCategory: (category: string) => void;
  handleOrderBy: (order: string) => void;
  defaultCategory?: string;
}

export const FilterButton = ({
  categories,
  handleCategory,
  handleOrderBy,
  defaultCategory,
}: FilterButtonProps) => {
  const [orderBy, setOrderBy] = useState("new");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (defaultCategory) {
      setCategory(defaultCategory);
    }
  }, [defaultCategory]);

  return (
    <div className="text-xs">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-10">
            <SlidersHorizontal className="shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-xs">
          <DropdownMenuLabel className="text-sm">
            Filtrar por:
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2"]}
            className="w-[40vw]"
          >
            <AccordionItem value="item-1" className="w-full">
              <AccordionTrigger>Ordenar por:</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue={orderBy}
                  onValueChange={(value) => {
                    handleOrderBy(value);
                    setOrderBy(value);
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
                    <RadioGroupItem value="cheap" id="cheap" />
                    <Label htmlFor="cheap">Menor Precio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expensive" id="expensive" />
                    <Label htmlFor="expensive">Mayor Precio</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="w-full">
              <AccordionTrigger>Elegir Categoría</AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue={category}
                  onValueChange={(value) => {
                    handleCategory(value);
                    setCategory(value);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="text-xs">
                      Todo
                    </Label>
                  </div>
                  {categories.map((c) => (
                    <div key={c.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={c.name} id={c.name} />
                      <Label htmlFor={c.name} className="text-xs">
                        {capitalizeFirstLetter(c.name)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
