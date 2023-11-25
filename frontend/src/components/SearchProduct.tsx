"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchProductProps {}

export const SearchProduct = ({}: SearchProductProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 700);
  return (
    <>
      <p>Buscar: </p>
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") || ""}
      />
    </>
  );
};

export default SearchProduct;
