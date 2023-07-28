import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }

  //   interface User {
  //     id: number;
  //     email: string;
  //     displayName: string;
  //   }

  //   interface AdapterUser {
  //     id: number;
  //     email: string;
  //     emailVerified: Date | null;
  //   }
}
