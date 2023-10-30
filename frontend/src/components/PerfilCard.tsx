"use client";

import { useSession } from "next-auth/react";
import { getFragmentData } from "../graphql/generated";
import {
  GetUserByIdDocument,
  UpdateUserDocument,
  UserPropsFragmentDoc,
} from "../graphql/generated/graphql";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Check, Pencil, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useMutation } from "@apollo/client";

interface PerfilCardProps {}

export const PerfilCard = ({}: PerfilCardProps) => {
  const { data: userData, status } = useSession({ required: true });
  const { data: userInfo } = useSuspenseQuery(GetUserByIdDocument, {
    variables: { id: userData?.user.id! },
  });
  const [editing, setEditing] = useState(false);
  const [updateUser] = useMutation(UpdateUserDocument);

  const user = getFragmentData(UserPropsFragmentDoc, userInfo?.getUserById);

  const [nameInput, setNameInput] = useState(user?.displayName);
  const [phoneInput, setphoneInput] = useState(user?.phoneNumber);
  const [addressInput, setAddressInput] = useState(user?.address);

  useEffect(() => {
    setNameInput(user?.displayName);
    setphoneInput(user?.phoneNumber);
    setAddressInput(user?.address);
  }, [user]);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setphoneInput(e.target.value);
  };

  const hanldeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  const HandleCheck = async () => {
    updateUser({
      variables: {
        input: {
          id: user?.id!,
          displayName: nameInput ? nameInput : user?.displayName!,
          phoneNumber: phoneInput,
          address: addressInput,
        },
      },
    });
    setEditing(false);
  };

  return status === "loading" ? (
    <LoadingSkeleton />
  ) : user ? (
    <Card className="w-[90%]">
      <CardHeader>
        <CardTitle>{user.displayName}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-5 relative">
        {!editing ? (
          <Pencil
            onClick={() => setEditing(true)}
            className="absolute top-0 right-0 mr-2 mt-2 w-5"
          />
        ) : (
          <div className="flex flex-row absolute top-0 right-0 mr-2 mt-2 gap-3">
            <Check onClick={() => HandleCheck()} className="w-5" />
            <X onClick={() => setEditing(false)} className="w-5" />
          </div>
        )}

        <div className="flex flex-col gap-3 mt-5">
          <Label className="text-gray-500">Nombres y Apellidos</Label>
          {!editing ? (
            <Label>{user.displayName}</Label>
          ) : (
            <Input value={nameInput} onChange={handleName} />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Correo Electrónico</Label>
          <Label>{user.email}</Label>
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Número de Celular</Label>
          {!editing ? (
            <Label>
              {user.phoneNumber ? user.phoneNumber : "No Registrado"}
            </Label>
          ) : (
            <Input
              value={phoneInput ? phoneInput : ""}
              onChange={handlePhone}
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label className="text-gray-500">Dirección</Label>
          {!editing ? (
            <Label>{user.address ? user.address : "No Registrada"}</Label>
          ) : (
            <Input
              value={addressInput ? addressInput : ""}
              onChange={hanldeAddress}
            />
          )}
        </div>
      </CardContent>
    </Card>
  ) : null;
};
