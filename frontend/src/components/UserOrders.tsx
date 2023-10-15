"use client";

import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import {
  GetOrdersByUserIdDocument,
  OrderPropsFragment,
  OrderPropsFragmentDoc,
  PaymentStatus,
  ShippingStatus,
  ShippingStatusEnum,
} from "../graphql/generated/graphql";

import { getDateFromTimteStamp } from "../app/utils/dateUtils";
import { getFragmentData } from "../graphql/generated/fragment-masking";
import { LoadingSkeleton } from "./LoadingSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Loading } from "./Loading";

interface userOrdersProps {}

export const UserOrders = ({}: userOrdersProps) => {
  const { data: userData, status } = useSession({ required: true });
  const { data: orderData } = useQuery(GetOrdersByUserIdDocument, {
    variables: { userId: userData?.user.id! },
    fetchPolicy: "no-cache",
  });

  const orders = getFragmentData(
    OrderPropsFragmentDoc,
    orderData?.getOrdersByUserId
  );

  const getOrderPaymentStatus = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case PaymentStatus.Pendiente:
        return <p className="text-blue-500">Pago Pendiente</p>;
      case PaymentStatus.Pagado:
        return <p className="text-green-500">Pagado</p>;
      case PaymentStatus.PagoFallido:
        return <p className="text-red-700">Pago Fallido</p>;
      case PaymentStatus.Reintegrado:
        return <p className="text-gray-500">Reintegrado</p>;
    }
  };
  const getOrderShippingStatus = (shippingStatus: ShippingStatus) => {
    switch (shippingStatus) {
      case ShippingStatus.Entregado:
        return <p className="text-green-500">Entregado</p>;
      case ShippingStatus.PorEntregar:
        return <p className="text-blue-500">Por Entregar</p>;
      case ShippingStatus.Cancelado:
        return <p className="text-gray-500">Por Entregar</p>;
    }
  };

  return orders && orders.length > 0 && status !== "loading" ? (
    <div className="pt-20 flex flex-col gap-3 items-center">
      <div className="grid grid-cols-6 place-items-center justify-center w-[95%] md:w-[50%] font-bold text-sm md:text-base">
        <p>ID</p>
        <p className="">Fecha</p>
        <p className="col-span-2">Estado de Pago</p>
        <p className="col-span-2 md:text-base text-xs text-center">
          Estado de Entrega
        </p>
      </div>
      {[...orders]
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        .map((order) => (
          <Card key={order.id} className=" w-[95%] md:w-[50%] ">
            <Accordion type="single" collapsible>
              <div key={order.id} className="flex flex-row w-full">
                <AccordionItem value={order.id.toString()} className="w-full">
                  <AccordionTrigger>
                    <div className="grid grid-cols-6 items-center w-full">
                      <p className="text-sm">{order.id}</p>
                      <p className="text-sm">
                        {getDateFromTimteStamp(order.createdAt)}
                      </p>
                      <div className="col-span-2 text-sm">
                        {getOrderPaymentStatus(order.paymentStatus)}
                      </div>
                      <p className="col-span-2 text-sm">
                        {getOrderShippingStatus(order.shippingStatus)}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <Separator />
                      <div className="grid grid-cols-4 gap-3 justify-items-center">
                        <p>Cantidad</p>
                        <p className="col-span-2">Producto</p>
                        <p>Precio</p>
                      </div>
                      {order.products.map((p) => (
                        <div key={p.id} className="grid grid-cols-4">
                          <p className="text-center">{p.quantity}</p>
                          <p className="col-span-2 flex ">{p.name}</p>
                          <p className="pl-4">S/. {p.price * p.quantity}</p>
                        </div>
                      ))}
                      <Separator />
                      <div className="grid grid-cols-4">
                        <p className="col-start-3 text-end font-bold">Total:</p>
                        <p className="pl-4 font-bold">S/. {order.total}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </Card>
        ))}
    </div>
  ) : status === "loading" ? (
    <div className="w-full h-[50vh] flex justify-center items-end">
      <Loading />
    </div>
  ) : (
    <div className="mt-20 flex justify-center">No tienes pedidos</div>
  );
};
