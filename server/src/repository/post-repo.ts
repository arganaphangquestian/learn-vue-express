import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type PostBody = {
  name: string;
  userId: number;
};

export default class PostRepo {
  static getPostByID = async (id: number) => {
    return prisma.post.findFirst({ include: { User: true }, where: { id } });
  };

  static getAllPosts = async () => {
    return prisma.post.findMany({ include: { User: true } });
  };

  static createPost = async (post: PostBody) => {
    return prisma.post.create({
      data: {
        name: post.name,
        userId: post.userId,
      },
    });
  };
}
