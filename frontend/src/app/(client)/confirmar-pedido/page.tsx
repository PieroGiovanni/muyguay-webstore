"use client";

import { useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { toast } from "../../../components/ui/use-toast";
import { CreateOrderDocument } from "../../../graphql/generated/graphql";
import { ProductWithQuantity, useBagContext } from "../../context/bagContext";

interface PageProps {}

const Page = ({}: PageProps) => {
  const { bagProducts, setBagProducts } = useBagContext();
  const [total, setTotal] = useState(0);
  const [text, setText] = useState(" ");
  const router = useRouter();
  const { data } = useSession({ required: true });
  const [createOrder] = useMutation(CreateOrderDocument);
  const [products, setProducts] = useState<ProductWithQuantity[]>();

  const userName = data?.user.name;
  useEffect(() => {
    let total = 0;
    let text = "Cliente: " + userName + "\n\nLista de Productos: \n\n";

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
    setProducts(bagProducts);
  }, [bagProducts, userName]);

  const whatsappURL = `https://wa.me/51955119590?text=${encodeURIComponent(
    text
  )}`;

  const handleOnClick = async () => {
    let products: { id: number; quantity: number }[] = [];
    bagProducts.map((p) => {
      products.push({ id: p.id, quantity: p.quantity });
    });
    try {
      await createOrder({
        variables: {
          input: {
            productWithQuantity: products,
            userId: data?.user.id!,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
    setBagProducts([]);
    toast({
      description: "Gracias Por tu Compra 😍",
    });
    router.push("/tienda");
    setTimeout(() => {
      window.location.href = whatsappURL;
    }, 2000);
  };

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
          {products?.map((p) => (
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
        <Button onClick={handleOnClick}>Confirmar Compra</Button>

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
