"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface EmailPasswordFormProps {}

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Ingresa tu email" })
    .email("Email inválido"),
  password: z.string().nonempty({
    message: "Ingresa tu contraseña",
  }),
});

export const EmailPasswordForm = ({}: EmailPasswordFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") as string;
  const errorUrl = searchParams.get("error") as string;

  const [showWarning, setShowWarning] = useState(true);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl,
    });
  };

  const registerUrl =
    "/registrarse?callbackUrl=" + encodeURIComponent(callbackUrl);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {errorUrl === "CredentialsSignin" && showWarning ? (
          <FormMessage>Email o Contraseña Incorrecta</FormMessage>
        ) : null}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Email</FormLabel> */}
              <FormControl>
                <Input
                  onFocus={() => setShowWarning(false)}
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Contraseña</FormLabel> */}
              <FormControl>
                <Input type="password" placeholder="Contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-5">
          <Button type="submit">Ingresar</Button>
          <Link href={registerUrl}>
            <Button>Registrarse</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};
