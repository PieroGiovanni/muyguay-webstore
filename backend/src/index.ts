import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import express from "express";
import { buildSchema } from "type-graphql";
import { expressMiddleware } from "@apollo/server/express4";
import path from "path";
import { PrismaClient } from "@prisma/client";
import cors, { CorsRequest } from "cors";
import bodyParser from "body-parser";

interface MyContext {
  prisma: PrismaClient;
}

export const prisma = new PrismaClient();

const app = express();

const main = async () => {
  await prisma.$connect().then(() => console.log("Postgres db connectd"));

  const apolloServer = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [path.join(__dirname, "resolvers/*.js")],
      validate: false,
    }),
  });

  await apolloServer.start();

  app.use(
    "/",
    cors<CorsRequest>({ origin: process.env.CORS_ORIGIN, credentials: true }),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
      context: async () => {
        return { prisma };
      },
    })
  );

  app.listen(process.env.PORT, () => {
    console.log("Server running on port ", process.env.PORT);
  });
};

main().catch((err) => console.log(err));
