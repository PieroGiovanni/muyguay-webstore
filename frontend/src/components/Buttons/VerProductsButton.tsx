"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loading } from "../Loading";

interface VerProductsButtonProps {}

export const VerProductsButton = ({}: VerProductsButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      <Link href="/tienda">
        <Button className="text-sm w-40" onClick={handleClick}>
          {isLoading ? <Loading size="xs" color="black" /> : "VER PRODUCTOS"}
        </Button>
      </Link>
    </>
  );
};
