"use client";

import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import {
  GetOrdersByUserIdDocument,
  OrderPropsFragment,
  OrderPropsFragmentDoc,
  PaymentSatus,
  ShippingStatus,
} from "../graphql/generated/graphql";

import { getDateFromTimteStamp } from "../app/utils/dateUtils";
import { getFragmentData } from "../graphql/generated/fragment-masking";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";

interface userOrdersProps {}

export const UserOrders = ({}: userOrdersProps) => {
  const { data: userData, status } = useSession({ required: true });
  const { data: orderData } = useQuery(GetOrdersByUserIdDocument, {
    variables: { userId: userData?.user.id! },
  });

  const ordersWithoutTotal = getFragmentData(
    OrderPropsFragmentDoc,
    orderData?.getOrdersByUserId
  );

  useEffect(() => {
    console.log("USER DATA FROM SESSION: ", userData);
  }, [userData]);

  const calculateOrderTotal = (order: OrderPropsFragment) => {
    let total = 0;
    order.products.map((p) => {
      total += p.price * p.quantity;
    });
    return total;
  };

  const orders = ordersWithoutTotal?.map((order) => {
    return {
      ...order,
      total: calculateOrderTotal(order),
    };
  });

  const getOrderPaymentStatus = (paymentStatus: PaymentSatus) => {
    switch (paymentStatus) {
      case PaymentSatus.Pendiente:
        return <p className="text-red-500">Pago Pendiente</p>;
      case PaymentSatus.Pagado:
        return <p className="text-green-500">Pagado</p>;
      case PaymentSatus.PagoFallido:
        return <p className="text-red-700">Pago Fallido</p>;
      case PaymentSatus.Reintegrado:
        return <p className="text-blue-500">Reintegrado</p>;
    }
  };
  const getOrderShippingStatus = (shippingStatus: ShippingStatus) => {
    switch (shippingStatus) {
      case ShippingStatus.Entregado:
        return <p className="text-green-500">Entregado</p>;
      case ShippingStatus.PorEntregar:
        return <p className="text-red-500">Por Entregar</p>;
    }
  };

  return orders && orders.length > 0 && status !== "loading" ? (
    <div className="pt-20 flex flex-col gap-3 items-center">
      {orders.map((order) => (
        <Card key={order.id} className="w-[95%]">
          <Accordion type="single" collapsible>
            <div key={order.id} className="flex flex-row justify-center">
              <AccordionItem value={order.id.toString()}>
                <AccordionTrigger>
                  <div className="grid grid-cols-3 items-center justify-stretch gap-5 w-80">
                    <div className="flex flex-col">
                      <p>ID {order.id}</p>
                      <p>{getDateFromTimteStamp(order.createdAt)}</p>
                    </div>
                    <div>{getOrderPaymentStatus(order.paymentStatus)}</div>
                    <p>{getOrderShippingStatus(order.shippingStatus)}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {order.products.map((p) => (
                      <div
                        key={p.id}
                        className="grid grid-cols-4 gap-3 justify-items-center"
                      >
                        <p>{p.quantity}</p>
                        <p className="col-span-2">{p.name}</p>
                        <p>S/. {p.price * p.quantity}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="grid grid-cols-4 gap-3 justify-items-center">
                      <p className="col-start-2 col-span-2">Total:</p>
                      <p>S/. {order.total}</p>
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
    <div className="mt-20 flex items-center space-x-4 justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <div className="mt-20 flex justify-center">No tienes pedidos</div>
  );
};
