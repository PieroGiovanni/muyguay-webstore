import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "../../../../lib/client";
import {
  GetProductDocument,
  GetProductsDocument,
  LoginDocument,
  RegularUserInfoFragmentDoc,
  User,
  UserInfo,
} from "../../../../generated/graphql/graphql";
import { Login } from "../../queries";
import { useFragment } from "../../../../generated/graphql";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Correo",
          type: "text",
          placeholder: "correo@ejemplo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { user, errors } = await Login(
          credentials?.email as string,
          credentials?.password as string
        );

        if (user) {
          // Any object returned will be saved in `user` property of the JWT

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.displayName,
          };
        } else {
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  // pages: { signIn: "/signin" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
