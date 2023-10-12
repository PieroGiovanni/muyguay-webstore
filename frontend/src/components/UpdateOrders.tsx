"use client";

import { useQuery } from "@apollo/client";
import { getFragmentData } from "../graphql/generated";
import {
  GetOrdersDocument,
  OrderPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Card, CardContent } from "./ui/card";
import { getDateFromTimteStamp } from "../app/utils/dateUtils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FileEdit } from "lucide-react";
import { UpdateOrderDialog } from "./UpdateOrderDialog";

interface UpdateOrdersProps {}

export const UpdateOrders = ({}: UpdateOrdersProps) => {
  const { data } = useQuery(GetOrdersDocument);
  const orders = getFragmentData(OrderPropsFragmentDoc, data?.getOrders);

  return orders ? (
    <div>
      <div className="grid grid-cols-6 items-center justify-items-center gap-2">
        <p>ID</p>
        <p>Fecha2</p>
        <p>Usuario</p>
        <p className="col-span-2">Importe</p>
        <p>Editar</p>
      </div>
      {[...orders]
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        .map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-6 items-center justify-items-center gap-2"
          >
            <p>{order.id}</p>
            <p>{getDateFromTimteStamp(order.createdAt)}</p>
            <p>{order.userName}</p>

            <Accordion
              key={order.id}
              type="single"
              collapsible
              className="col-span-2"
            >
              <AccordionItem value={order.id.toString()}>
                <AccordionTrigger>{"S/. " + order.total}</AccordionTrigger>
                <AccordionContent>
                  {order.products.map((product) => (
                    <div key={product.id} className="flex flex-row gap-2">
                      <p>{product.quantity}</p>
                      <p>{product.name}</p>
                      <p>{"S/. " + product.price}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <UpdateOrderDialog order={order} />
          </div>
        ))}
    </div>
  ) : (
    <LoadingSkeleton />
  );
};
