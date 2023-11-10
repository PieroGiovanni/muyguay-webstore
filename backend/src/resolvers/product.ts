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
import {
  Product,
  ProductCategory,
  Brand,
  Image,
} from "@generated/type-graphql";
import { prisma } from "..";

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

  @Field(() => String, { nullable: true })
  imageUrl?: string;
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts() {
    return await prisma.product.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
  }

  @Query(() => [Product])
  async getFilteredProducts(
    @Arg("query", () => String, { nullable: true })
    query?: string,
    @Arg("categoryId", () => Int, { nullable: true })
    categoryId?: number,
    @Arg("orderBy", () => String, { nullable: true })
    orderBy?: string
  ): Promise<Product[]> {
    try {
      let sortingOptions = {};
      switch (orderBy) {
        case "old":
          sortingOptions = { updatedAt: "asc" };
          break;
        case "less-expensive":
          sortingOptions = { price: "asc" };
          break;
        case "most-expensive":
          sortingOptions = { price: "desc" };
          break;
        default:
          sortingOptions = { updatedAt: "desc" };
      }

      return await prisma.product.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
          productCategoryId: categoryId,
        },
        orderBy: [sortingOptions],
      });
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
  async getFeaturedProdcuts(
    @Arg("isFeatured", () => Boolean)
    isFeatured: boolean
  ): Promise<readonly Product[]> {
    return await prisma.product.findMany({
      where: {
        isFeatured,
      },
    });
  }

  @Query(() => [Product])
  async getNewProducts(
    @Arg("quantity", () => Int)
    quantity: number
  ): Promise<readonly Product[]> {
    return await prisma.product.findMany({
      orderBy: {
        updatedAt: "desc",
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
  ) {
    if (productInput.stock) {
      await prisma.stock.update({
        data: {
          stockQuantity: productInput.stock,
        },
        where: {
          productId: id,
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
        productCategoryId: productInput.productCategoryId,
      },
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("productInput", () => ProductInput) productInput: ProductInput
  ): Promise<Product> {
    try {
      const product = await prisma.product.create({
        data: {
          name: productInput.name!,
          price: productInput.price!,
          description: productInput.description,
          brandId: productInput.brandId as number,
          productCategoryId: productInput.productCategoryId as number,
          tags: productInput.tags,
          isFeatured: productInput.isFeatured,
        },
      });

      await prisma.stock.create({
        data: {
          productId: product.id,
          stockQuantity: productInput.stock,
        },
      });

      await prisma.image.create({
        data: {
          productId: product.id,
          imageUrl: productInput.imageUrl,
        },
      });

      return product;
    } catch (error) {
      console.log("there was an error with product creation");
      throw error;
    }
  }
}
