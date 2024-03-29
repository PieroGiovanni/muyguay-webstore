"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

interface VerProductsButtonProps {}

export const VerProductsButton = ({}: VerProductsButtonProps) => {
  return (
    <>
      <Link href="/tienda">
        <Button className="text-sm">VER PRODUCTOS</Button>
      </Link>
    </>
  );
};
