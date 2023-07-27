"use client";

import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import {
  GetOrdersByUserIdDocument,
  OrderPropsFragmentDoc,
} from "../generated/graphql/graphql";

import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { getDateFromTimteStamp } from "../app/utils/dateUtils";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { useFragment } from "../generated/graphql/fragment-masking";

interface userOrdersProps {}

export const UserOrders = ({}: userOrdersProps) => {
  const { data: userData } = useSession({ required: true });
  const { data: orderData } = useQuery(GetOrdersByUserIdDocument, {
    variables: { userId: userData?.user.id! },
  });

  const orders = useFragment(
    OrderPropsFragmentDoc,
    orderData?.getOrdersByUserId
  );

  return orders ? (
    <div className="pt-20 flex flex-col gap-3 items-center">
      {orders.map((order) => (
        <Card key={order.id} className="w-[90%]">
          <Accordion type="single" collapsible>
            <div key={order.id} className="flex flex-row justify-center">
              <AccordionItem value={order.id.toString()}>
                <AccordionTrigger>
                  <div className="flex flex-row justify-center gap-3 items-center">
                    <div className="flex flex-col">
                      <p>{order.id}</p>
                      <p>{getDateFromTimteStamp(order.createdAt)}</p>
                    </div>
                    <p>{order.paymentStatus}</p>
                    <p>{order.shippingStatus}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {order.products.map((p) => (
                      <div key={p.id} className="grid grid-cols-4 gap-3 ">
                        <p>{p.quantity}</p>
                        <p className="col-span-2">{p.name}</p>
                        <p>S/. {p.price}</p>
                      </div>
                    ))}
                    <Separator />
                    <p>TEST</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </Card>
      ))}
    </div>
  ) : (
    <div className="mt-20">No tienes pedidos</div>
  );
};
