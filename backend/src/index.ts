import { ApolloServer } from "@apollo/server";
import express from "express";
import { buildSchema } from "type-graphql";
import path from "path";
import { PrismaClient } from "@prisma/client";

interface MyContext {
  prisma: PrismaClient;
}

export const prisma = new PrismaClient();

const app = express();

const main = async () => {
  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "resolvers/*.js") as string],
      validate: false,
    }),
  });
};
