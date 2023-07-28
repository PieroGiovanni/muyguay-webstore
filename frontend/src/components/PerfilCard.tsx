"use client";

import { useSession } from "next-auth/react";
import { getFragmentData } from "../graphql/generated";
import {
  GetUserByIdDocument,
  UserPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface PerfilCardProps {}

export const PerfilCard = ({}: PerfilCardProps) => {
  const { data: userData, status } = useSession({ required: true });
  const { data: userInfo } = useQuery(GetUserByIdDocument, {
    variables: { id: userData?.user.id! },
  });

  const user = getFragmentData(UserPropsFragmentDoc, userInfo?.getUserById);

  return status === "loading" ? (
    <LoadingSkeleton />
  ) : user ? (
    <Card className="w-[90%]">
      <CardHeader>
        <CardTitle>{user.displayName}</CardTitle>
      </CardHeader>
      <Separator />
      <br />
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Nombres y Apellidos</Label>
          <Label>{user.displayName}</Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Correo Electrónico</Label>
          <Label>{user.email}</Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Número de Celular</Label>
          <Label>{user.phoneNumber ? user.phoneNumber : "No registrado"}</Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Dirección</Label>
          <Label>{user.address ? user.address : "No registrada"}</Label>
        </div>
      </CardContent>
    </Card>
  ) : null;
};
