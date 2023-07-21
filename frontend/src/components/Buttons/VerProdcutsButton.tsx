import Link from "next/link";
import { Button } from "../ui/button";

interface VerProdcutsButtonProps {}

export const VerProdcutsButton = ({}: VerProdcutsButtonProps) => {
  return (
    <Link href="/tienda">
      <Button className="font-sans border-[1px] border-white text-sm">
        VER PRODUCTOS
      </Button>
    </Link>
  );
};
