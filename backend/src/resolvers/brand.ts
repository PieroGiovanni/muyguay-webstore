import { Query, Resolver } from "type-graphql";
import { Brand } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver(() => Brand)
export class BrandResolver {
  @Query(() => [Brand])
  async getBrands(): Promise<Brand[]> {
    return await prisma.brand.findMany();
  }
}
