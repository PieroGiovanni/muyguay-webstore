import { Query, Resolver } from "type-graphql";
import { prisma } from "..";
import { Image } from "@generated/type-graphql";

@Resolver()
export class ImageResolver {
  @Query(() => [Image])
  async getImages(): Promise<Image[]> {
    return await prisma.image.findMany();
  }
}
