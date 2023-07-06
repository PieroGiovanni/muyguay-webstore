import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { ProductCategory } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver()
export class ProductCategoryResolver {
  @Mutation(() => ProductCategory)
  async createProductCategory(
    @Arg("name") name: string
  ): Promise<ProductCategory> {
    return await prisma.productCategory.create({ data: { name } });
  }

  @Query(() => [ProductCategory])
  async getProductCategories() {
    return await prisma.productCategory.findMany();
  }
}
