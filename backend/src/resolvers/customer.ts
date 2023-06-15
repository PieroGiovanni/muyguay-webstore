import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Customer } from "@generated/type-graphql";
import { prisma } from "..";

@InputType()
class CustomerInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field()
  phoneNumber: string;
}

@Resolver()
export class CustomerResolver {
  @Query(() => Customer)
  async getCustomer(id: number) {
    return await prisma.customer.findUnique({ where: { id } });
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Arg("input") input: CustomerInput
  ): Promise<Customer | null> {
    return await prisma.customer.create({ data: input });
  }
}
