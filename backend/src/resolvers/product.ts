import { Resolver, Query, FieldResolver, Root, Arg, Int } from "type-graphql";
import { Product, ProductType, Brand, Image } from "@generated/type-graphql";
import { prisma } from "..";

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts() {
    return await prisma.product.findMany();
  }

  @FieldResolver(() => ProductType)
  async productType(@Root() product: Product): Promise<ProductType | null> {
    return await prisma.productType.findUnique({
      where: { id: product.productTypeId },
    });
  }

  @FieldResolver(() => Brand)
  async brand(@Root() product: Product): Promise<Brand | null> {
    return await prisma.brand.findUnique({
      where: { id: product.brandId },
    });
  }

  @Query(() => Product)
  async getProduct(@Arg("id", () => Int) id: number) {
    return await prisma.product.findUnique({ where: { id } });
  }

  @FieldResolver(() => [Image])
  async images(@Root() product: Product): Promise<Image[]> {
    return await prisma.image.findMany({
      where: {
        productId: product.id,
      },
    });
  }
}
