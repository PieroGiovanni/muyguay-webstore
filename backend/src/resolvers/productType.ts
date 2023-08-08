import { Query, Resolver } from "type-graphql";
import { ProductType } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver(() => ProductType)
export class ProductTypeResolver {
  @Query(() => [ProductType])
  async getProductTypes(): Promise<ProductType[]> {
    return await prisma.productType.findMany();
  }
}
