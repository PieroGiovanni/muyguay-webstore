import { Order, OrderItem } from "@generated/type-graphql";
import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { prisma } from "..";

@InputType()
class ProductWithQuantity {
  @Field(() => Int)
  productId: number;

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
  @FieldResolver(() => [OrderItem])
  async items(@Root() order: Order): Promise<OrderItem[]> {
    return await prisma.orderItem.findMany({
      where: {
        orderId: order.id,
      },
    });
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
          productId: p.productId,
          quantity: p.quantity,
        },
      });
    });

    return order;
  }
}
