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
  registerEnumType,
} from "type-graphql";
import { prisma } from "..";
import { PaymentStatus, ShippingStatus } from "@prisma/client";

registerEnumType(PaymentStatus, {
  name: "PaymentStatusEnum",
});

registerEnumType(ShippingStatus, {
  name: "ShippingStatusEnum",
});

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

@InputType()
class UpdateOrderInput {
  @Field(() => Int)
  id: number;

  @Field(() => PaymentStatus, { nullable: true })
  paymentStatus: PaymentStatus;

  @Field(() => ShippingStatus, { nullable: true })
  shippingStatus: ShippingStatus;
}

@Resolver(Order)
export class OrderResolver {
  @Query(() => [Order])
  async getOrders(): Promise<Order[]> {
    return await prisma.order.findMany();
  }

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

  @FieldResolver(() => String)
  async userName(@Root() order: Order): Promise<String> {
    const user = await prisma.user.findUnique({
      where: {
        id: order.userId,
      },
    });
    return user?.displayName!;
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

  @FieldResolver(() => Float)
  async total(@Root() order: Order): Promise<number> {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: order.id,
      },
      include: {
        product: {
          select: {
            price: true,
          },
        },
      },
    });

    let total = 0;

    orderItems.map((item) => {
      total += item.quantity * item.product.price;
    });

    return total;
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

  @Mutation(() => Order)
  async updateOrder(@Arg("input") input: UpdateOrderInput): Promise<Order> {
    return await prisma.order.update({
      data: {
        paymentStatus: input.paymentStatus,
        shippingStatus: input.shippingStatus,
      },
      where: {
        id: input.id,
      },
    });
  }
}
