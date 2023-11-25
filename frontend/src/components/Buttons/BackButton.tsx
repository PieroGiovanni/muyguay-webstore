"use client";

import { Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {}

export const BackButton = ({}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button className="flex items-center gap-1" onClick={() => router.back()}>
      <Undo2 />
      <p>Atrás</p>
    </Button>
  );
};
