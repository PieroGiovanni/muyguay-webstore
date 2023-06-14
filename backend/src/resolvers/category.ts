import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Category } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver()
export class CategoryResolver {
  @Mutation(() => Category)
  async createCategory(@Arg("name") name: string): Promise<Category> {
    return await prisma.category.create({ data: { name } });
  }

  @Query(() => [Category])
  async getCategories() {
    return await prisma.category.findMany();
  }
}
