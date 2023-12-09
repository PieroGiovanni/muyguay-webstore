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
  ObjectType,
} from "type-graphql";
import {
  Product,
  ProductCategory,
  Brand,
  Image,
} from "@generated/type-graphql";
import { prisma } from "..";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

@InputType()
export class ProductInput {
  @Field(() => Int, { nullable: true })
  brandId?: number;

  @Field(() => Int, { nullable: true })
  productCategoryId?: number;

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

  @Field(() => [String], { nullable: true })
  imagesUrl?: string[];
}

@ObjectType()
class PaginatedProducts {
  @Field(() => [Product])
  products: Product[];

  @Field(() => Boolean)
  hasMore: boolean;
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts() {
    return await prisma.product.findMany();
  }

  @Query(() => PaginatedProducts)
  async getFilteredProducts(
    @Arg("limit", () => Int)
    limit: number,
    @Arg("query", () => String, { nullable: true })
    query?: string,
    @Arg("categoryId", () => String, { nullable: true })
    categoryId?: string,
    @Arg("orderBy", () => String, { nullable: true })
    orderBy?: string,
    @Arg("cursor", () => Int, { nullable: true })
    cursor?: number | null
  ): Promise<PaginatedProducts> {
    try {
      let sortingOptions: Prisma.ProductOrderByWithRelationInput[];

      switch (orderBy) {
        case "old":
          sortingOptions = [{ id: "asc" }];
          break;
        case "less-expensive":
          sortingOptions = [{ price: "asc" }, { id: "desc" }];
          break;
        case "most-expensive":
          sortingOptions = [{ price: "desc" }, { id: "desc" }];
          break;
        default:
          sortingOptions = [{ id: "desc" }];
      }

      let realLimit = limit;

      const parsedCategoryId =
        categoryId && !isNaN(parseInt(categoryId))
          ? parseInt(categoryId)
          : undefined;

      const findManyArgs: Prisma.ProductFindManyArgs<DefaultArgs> = {
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
          productCategoryId: parsedCategoryId,
          stock: {
            stockQuantity: {
              gt: 0,
            },
          },
        },
        orderBy: sortingOptions,

        take: realLimit + 1,
      };

      if (cursor) {
        findManyArgs.cursor = {
          id: cursor,
        };
        findManyArgs.skip = 1;
      }

      const products = await prisma.product.findMany(findManyArgs);

      return {
        products: products.slice(0, realLimit),
        hasMore: products.length === realLimit + 1,
      };
    } catch (error) {
      console.error("Error in getFilteredProducts:", error);
      throw new Error("An error occurred while fetching products.");
    }
  }

  @Query(() => [Product])
  async getProductsByCategory(
    @Arg("categoryId", () => Int)
    categoryId: number
  ): Promise<readonly Product[]> {
    return await prisma.product.findMany({
      where: {
        productCategoryId: categoryId,
      },
    });
  }

  @Query(() => [Product])
  async getFeaturedProducts(): Promise<readonly Product[]> {
    return await prisma.product.findMany({
      where: {
        isFeatured: true,
        stock: {
          stockQuantity: {
            gt: 0,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  @Query(() => [Product])
  async getNewProducts(
    @Arg("quantity", () => Int)
    quantity: number
  ): Promise<readonly Product[]> {
    return await prisma.product.findMany({
      where: {
        stock: {
          stockQuantity: {
            gt: 0,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: quantity,
    });
  }

  @FieldResolver(() => ProductCategory)
  async productCategory(
    @Root() product: Product
  ): Promise<ProductCategory | null> {
    return await prisma.productCategory.findUnique({
      where: { id: product.productCategoryId },
    });
  }

  @FieldResolver(() => Brand)
  async brand(@Root() product: Product): Promise<Brand | null> {
    return await prisma.brand.findUnique({
      where: { id: product.brandId },
    });
  }

  @Query(() => Product)
  async getProduct(@Arg("id", () => Int) id: number): Promise<Product> {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Producto no encontrado");
    return product;
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
    @Arg("id", () => Int) id: number,
    @Arg("productInput", () => ProductInput) productInput: ProductInput
  ): Promise<Product> {
    try {
      return prisma.$transaction(async (tx) => {
        if (productInput.stock !== undefined) {
          await tx.stock.update({
            data: {
              stockQuantity: productInput.stock,
            },
            where: {
              productId: id,
            },
          });
        }

        if (productInput.imagesUrl !== undefined) {
          await tx.image.deleteMany({
            where: {
              productId: id,
            },
          });

          productInput.imagesUrl.forEach(async (imageUrl) => {
            await tx.image.create({
              data: {
                productId: id,
                imageUrl: imageUrl,
              },
            });
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
            productCategoryId: productInput.productCategoryId,
          },
          where: {
            id: id,
          },
        });
      });
    } catch (error) {
      console.log("there was an error updating the product");
      throw error;
    }
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("productInput", () => ProductInput) productInput: ProductInput
  ): Promise<Product> {
    try {
      return prisma.$transaction(async (tx) => {
        const product = await tx.product.create({
          data: {
            name: productInput.name!,
            price: productInput.price!,
            description: productInput.description,
            brandId: productInput.brandId!,
            productCategoryId: productInput.productCategoryId!,
            tags: productInput.tags,
            isFeatured: productInput.isFeatured,
          },
        });

        await tx.stock.create({
          data: {
            productId: product.id,
            stockQuantity: productInput.stock,
          },
        });

        productInput.imagesUrl!.forEach(async (imageUrl) => {
          await tx.image.create({
            data: {
              productId: product.id,
              imageUrl: imageUrl,
            },
          });
        });

        return product;
      });
    } catch (error) {
      console.log("there was an error with product creation");
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => Int) id: number): Promise<boolean> {
    try {
      return prisma.$transaction(async (tx) => {
        await tx.orderItem.deleteMany({
          where: { productId: id },
        });

        await tx.image.deleteMany({
          where: { productId: id },
        });

        await tx.stock.delete({
          where: { productId: id },
        });

        await tx.product.delete({
          where: { id },
        });

        return true;
      });
    } catch (error) {
      console.log("There was an error deleting the product");
      throw error;
    }
  }
}
