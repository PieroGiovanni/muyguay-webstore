import NextAuth from "next-auth/next";
import { UserType, UserTypeEnum } from "../graphql/generated/graphql";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      userType: UserType;
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
