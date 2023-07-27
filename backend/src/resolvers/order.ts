import { Order, OrderItem } from "@generated/type-graphql";
import {
  Arg,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { prisma } from "..";

@ObjectType()
class OrderProduct extends OrderItem {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}

@InputType()
class ProductWithQuantity {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { defaultValue: 1 })
  quantity: number;
}

@InputType()
class OrderInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [ProductWithQuantity])
  productWithQuantity: ProductWithQuantity[];
}

@Resolver(Order)
export class OrderResolver {
  @Query(() => [Order])
  async getOrdersByUserId(
    @Arg("userId", () => Int)
    userId: number
  ): Promise<Order[]> {
    return await prisma.order.findMany({
      where: {
        userId,
      },
    });
  }

  @FieldResolver(() => [OrderProduct])
  async products(@Root() order: Order): Promise<OrderProduct[]> {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: order.id,
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });

    return orderItems
      .map((oi) => ({
        ...oi,
        name: oi.product.name,
        price: oi.product.price,
      }))
      .map(({ product, ...rest }) => rest);
  }

  @Mutation(() => Order)
  async createOrder(@Arg("input") input: OrderInput): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        userId: input.userId,
      },
    });

    input.productWithQuantity.map(async (p) => {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: p.id,
          quantity: p.quantity,
        },
      });
    });

    return order;
  }
}
