import { Resolver, Query } from "type-graphql";
import { Product } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async getProducts() {
    return await prisma.product.findMany();
  }
}
