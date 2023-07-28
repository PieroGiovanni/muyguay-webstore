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
class UpdateInput {
  @Field(() => Int)
  id: number;

  @Field()
  displayName: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  address: string;
}

@InputType()
class UserInput {
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
  @Query(() => User, { nullable: true })
  async getUserById(@Arg("id", () => Int) id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return user;
  }

  @Query(() => UserInfo, { nullable: true })
  async getUserByEmail(@Arg("email") email: string): Promise<UserInfo | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    // if (user) {
    //   const { password, ...userWithoutPassword } = user;
    //   return userWithoutPassword;
    // }
    return user;
  }

  @Mutation(() => UserInfo)
  async addGoogleUser(@Arg("input") input: UserInput): Promise<UserInfo> {
    return await prisma.user.create({
      data: {
        email: input.email,
        displayName: input.displayName,
      },
    });
  }

  @Query(() => [User])
  async getUsers() {
    return await prisma.user.findMany();
  }

  @Mutation(() => UserResponse)
  async register(@Arg("input") input: UserInput): Promise<UserResponse> {
    const hashedPassword = await hash(input.password);
    let user;
    try {
      user = await prisma.user.create({
        data: { ...input, password: hashedPassword },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          return {
            errors: [
              {
                field: "email",
                message: "El correo ya está en uso",
              },
            ],
          };
        }
      }
    }
    return { user };
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

  @Mutation(() => User)
  async updateUser(@Arg("input", () => UpdateInput) input: UpdateInput) {
    const user = await prisma.user.update({
      data: {
        displayName: input.displayName,
        phoneNumber: input.phoneNumber,
        address: input.address,
      },
      where: {
        id: input.id,
      },
    });

    return user;
  }
}
