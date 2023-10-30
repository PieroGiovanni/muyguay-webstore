import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AddGoogleUser, Login } from "../api/mutations";
import { getUserByEmail } from "../api/queries";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "text",
          placeholder: "correo@ejemplo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { user } = await Login(
          credentials?.email as string,
          credentials?.password as string
        );
        if (user) {
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.displayName,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    async session({ session }) {
      const user = await getUserByEmail(session.user.email);

      session.user.id = user!.id;
      session.user.userType = user!.userType;

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await getUserByEmail(user.email!);

        if (!existingUser) {
          const newUser = await AddGoogleUser({
            email: user.email!,
            displayName: user.name!,
          });
          console.log("GOOGLE USER ADDED: ", newUser);
        }
      }

      return true;
    },
  },
};
