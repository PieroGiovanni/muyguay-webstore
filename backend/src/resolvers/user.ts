import { User } from "@generated/type-graphql";
import { hash, verify } from "argon2";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { prisma } from "..";
import { Prisma } from "@prisma/client";

@InputType()
class Input {
  @Field()
  displayName: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  password: string;
}

@ObjectType()
class UserInfo {
  @Field(() => Int)
  id: number;

  @Field()
  displayName: string;

  @Field()
  email: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => UserInfo, { nullable: true })
  user?: UserInfo;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }

  @Query(() => [User])
  async getUsers() {
    return await prisma.user.findMany();
  }

  @Mutation(() => UserResponse)
  async register(@Arg("input") input: Input): Promise<UserResponse> {
    const hashedPassword = await hash(input.password);

    try {
      const user = await prisma.user.create({
        data: { ...input, password: hashedPassword },
      });
      return { user };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return {
            errors: [
              {
                field: "email",
                message: "email already taken",
              },
            ],
          };
        }
      }
      throw err;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "email is not registered",
          },
        ],
      };
    }

    const valid = await verify(user.password!, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password is incorrect",
          },
        ],
      };
    }

    return { user };
  }
}
