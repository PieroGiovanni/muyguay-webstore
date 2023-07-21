"use client";

import { useContext, useEffect, useState } from "react";
import { useBagContext } from "../context/bagContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { text } from "stream/consumers";
import { useRouter } from "next/navigation";

interface PageProps {}

const Page = ({}: PageProps) => {
  const { bagProducts, setBagProducts } = useBagContext();
  const [total, setTotal] = useState(0);
  const [text, setText] = useState(" ");
  const router = useRouter();

  useEffect(() => {
    let total = 0;
    let text = "LISTA DE PRODUCTOS: \n\n";
    bagProducts.map((p) => {
      total = total + p.price * p.quantity;
      text =
        text +
        p.quantity +
        " " +
        p.name +
        ": S/. " +
        p.price * p.quantity +
        " \n";
    });
    setTotal(total);
    setText(text + "\n" + "TOTAL: S/. " + total);

    bagProducts.forEach((p) => {});
  }, [bagProducts]);

  const whatsappURL = `https://wa.me/51948614445?text=${encodeURIComponent(
    text
  )}`;

  return bagProducts ? (
    <Card className="pt-20 flex flex-col gap-3">
      <CardTitle className="flex justify-center">LISTA DE PRODCUTOS</CardTitle>
      <CardContent className="flex flex-col">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-4 font-bold justify-items-center">
            <p>Cantidad</p>
            <p className="col-span-2">Nombre</p>
            <p>Precio</p>
          </div>
          {bagProducts.map((p) => (
            <div key={p.id} className="grid grid-cols-4 justify-items-center">
              <p>{p.quantity}</p>
              <p className="col-span-2">{p.name}</p>
              <p>S/.{p.price * p.quantity}</p>
            </div>
          ))}
          <Separator />
          <div className="flex flex-row justify-end gap-3 pr-6">
            <p>TOTAL</p>
            <p>S/.{total}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-center gap-3">
        <a href={whatsappURL}>
          <Button onClick={() => router.push("/tienda")}>
            Confirmar Pedido
          </Button>
        </a>

        <Link href="/tienda">
          <Button>Seguir Comprando</Button>
        </Link>
      </CardFooter>
    </Card>
  ) : (
    <p className="pt-20">No hay productos en la Cartera</p>
  );
};
export default Page;
