import { Image, Product } from "@generated/type-graphql";
import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { prisma } from "..";

@InputType()
export class ImageInput {
  @Field(() => Int)
  productId: number;

  @Field()
  imageUrl: string;
}

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

  @Mutation(() => Image)
  async addProductImage(
    @Arg("imageInput", () => ImageInput) imageInput: ImageInput
  ): Promise<Image> {
    return await prisma.image.create({
      data: {
        productId: imageInput.productId,
        imageUrl: imageInput.imageUrl,
      },
    });
  }
}
