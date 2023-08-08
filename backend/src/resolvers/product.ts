import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  Float,
} from "type-graphql";
import { Product, ProductType, Brand, Image } from "@generated/type-graphql";
import { prisma } from "..";

@InputType()
export class ProductInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  brandId?: number;

  @Field(() => Int, { nullable: true })
  productTypeId?: number;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => Boolean, { nullable: true })
  isFeatured?: boolean;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  stock?: number;
}

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

  @FieldResolver(() => Int)
  async stock(@Root() product: Product): Promise<number | undefined> {
    const stock = await prisma.stock.findUnique({
      where: { productId: product.id },
    });

    return stock?.stockQuantity;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("productInput", () => ProductInput) productInput: ProductInput
  ) {
    if (productInput.stock) {
      await prisma.stock.update({
        data: {
          stockQuantity: productInput.stock,
        },
        where: {
          productId: productInput.id,
        },
      });
    }
    return await prisma.product.update({
      data: {
        brandId: productInput.brandId,
        description: productInput.description,
        isFeatured: productInput.isFeatured,
        name: productInput.name,
        price: productInput.price,
        tags: productInput.tags,
        productTypeId: productInput.productTypeId,
      },
      where: {
        id: productInput.id,
      },
    });
  }
}
