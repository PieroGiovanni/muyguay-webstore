import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { prisma } from "..";
import { Image, Product } from "@generated/type-graphql";

@Resolver(Image)
export class ImageResolver {
  @Query(() => [Image])
  async getImages(): Promise<Image[]> {
    return await prisma.image.findMany();
  }

  @FieldResolver(() => Product)
  async product(@Root() image: Image): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id: image.productId,
      },
    });
  }
}
