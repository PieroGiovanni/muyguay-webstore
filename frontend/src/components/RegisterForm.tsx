"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  RegisterDocument,
  RegularErrorFragmentDoc,
  RegularUserInfoFragmentDoc,
  RegularUserResponseFragmentDoc,
} from "../graphql/generated/graphql";
import { useMutation } from "@apollo/client";
import { getFragmentData } from "../graphql/generated";

interface RegisterFormProps {}

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Ingresa tu email" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .nonempty({
      message: "Ingresa una contraseña",
    })
    .min(6, { message: "La contraseña es muy corta" }),
  repeatPassword: z.string().nonempty("Ingresa una contraseña"),
  name: z.string().nonempty({ message: "Ingresa tu nombre" }),
  phone: z.string(),
  address: z.string(),
});

export const RegisterForm = ({}: RegisterFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      phone: "",
      address: "",
    },
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") as string;
  const errorUrl = searchParams.get("error") as string;
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(true);
  const [passwordsError, setPasswordsError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState({
    showError: false,
    message: "",
  });
  const [register, { data, loading, error }] = useMutation(RegisterDocument);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.repeatPassword) {
      setPasswordsError(true);
    } else {
      const registerResponse = await register({
        variables: {
          input: {
            email: values.email,
            password: values.repeatPassword,
            displayName: values.name,
            address: values.address,
            phoneNumber: values.phone,
          },
        },
      });

      const regularResponse = getFragmentData(
        RegularUserResponseFragmentDoc,
        registerResponse.data?.register
      );

      const errors = getFragmentData(
        RegularErrorFragmentDoc,
        regularResponse?.errors
      );

      const user = getFragmentData(
        RegularUserInfoFragmentDoc,
        regularResponse?.user
      );

      if (errors) {
        setEmailError({
          showError: true,
          message: errors.find((e) => e.field === "email")?.message as string,
        });
      }

      if (user) {
        await signIn("credentials", {
          email: user.email,
          password: values.password,
          callbackUrl,
        });
      }
    }
  };

  useEffect(() => {
    console.log("DATA :", data);
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {errorUrl === "CredentialsSignin" && showWarning ? (
          <FormMessage>Email o Contraseña Incorrecta</FormMessage>
        ) : null}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre y Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Ingrea tu nombre completo (*)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  onFocus={() => setShowWarning(false)}
                  placeholder="Ingresa tu correo electrónico (*)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {emailError.showError === true ? (
                <FormMessage>{emailError.message}</FormMessage>
              ) : null}
              <FormDescription />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Almenos 6 caracteres (*)"
                  onFocus={() => setPasswordsError(false)}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetir Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Almenos 6 caracteres (*)"
                  onFocus={() => setPasswordsError(false)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {passwordsError === true ? (
                <FormMessage>Contraseñas distintas</FormMessage>
              ) : null}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Número de celular"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección de tu domicilio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        <Label className="text-xs">Campo obligatorio (*)</Label>
        <div className="flex flex-row gap-5">
          <Button type="submit">Registrarse</Button>
          <Button onClick={() => router.back()}>Ya tengo cuenta</Button>
        </div>
      </form>
    </Form>
  );
};
