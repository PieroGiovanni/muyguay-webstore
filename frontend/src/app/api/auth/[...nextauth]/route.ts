import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvier from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvier({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: { signIn: "/signin" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
