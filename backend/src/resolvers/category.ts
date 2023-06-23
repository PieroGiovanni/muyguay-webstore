import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { ProductCategory } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver()
export class CategoryResolver {
  @Mutation(() => ProductCategory)
  async createCategory(@Arg("name") name: string): Promise<ProductCategory> {
    return await prisma.productCategory.create({ data: { name } });
  }

  @Query(() => [ProductCategory])
  async getCategories() {
    return await prisma.productCategory.findMany();
  }
}
