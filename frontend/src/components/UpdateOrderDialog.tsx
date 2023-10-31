import { useMutation } from "@apollo/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { FileEdit } from "lucide-react";
import { useEffect, useState } from "react";
import {
  OrderPropsFragment,
  PaymentStatus,
  PaymentStatusEnum,
  ShippingStatus,
  ShippingStatusEnum,
  UpdateOrderDocument,
} from "../graphql/generated/graphql";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UpdateOrderDialogProps {
  order: OrderPropsFragment;
}

export const UpdateOrderDialog = ({ order }: UpdateOrderDialogProps) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusEnum>();
  const [shippingStatus, setShippingStatus] = useState<ShippingStatusEnum>();
  const [updateOrder] = useMutation(UpdateOrderDocument);

  const handleSaveButton = () => {
    updateOrder({
      variables: {
        input: {
          id: order.id,
          paymentStatus,
          shippingStatus,
        },
      },
    });
  };

  return order ? (
    <Dialog>
      <DialogTrigger>
        <FileEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-2">
          <DialogTitle>Actualizar Pedido</DialogTitle>
          <div className=" flex flex-row gap-2 items-center">
            <Label>Estado de Pago:</Label>
            <Select
              onValueChange={(e) => setPaymentStatus(e as PaymentStatusEnum)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={order.paymentStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PaymentStatus.Pagado}>
                  {PaymentStatus.Pagado}
                </SelectItem>
                <SelectItem value={PaymentStatus.PagoFallido}>
                  {PaymentStatus.PagoFallido}
                </SelectItem>
                <SelectItem value={PaymentStatus.Pendiente}>
                  {PaymentStatus.Pendiente}
                </SelectItem>
                <SelectItem value={PaymentStatus.Reintegrado}>
                  {PaymentStatus.Reintegrado}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-row gap-2 items-center">
            <Label>Estado de Entrega:</Label>
            <Select
              onValueChange={(e) => setShippingStatus(e as ShippingStatusEnum)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={order.shippingStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ShippingStatus.Entregado}>
                  {ShippingStatus.Entregado}
                </SelectItem>
                <SelectItem value={ShippingStatus.PorEntregar}>
                  {ShippingStatus.PorEntregar}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <DialogClose asChild>
              <Button onClick={handleSaveButton}>Guardar</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ) : (
    <LoadingSkeleton />
  );
};
