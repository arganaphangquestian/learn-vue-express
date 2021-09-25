import { Express } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type PostBody = {
  name: string;
  userId: number;
};

export default class PostController {
  constructor(app: Express) {
    app.get("/post", (_req, res) => {
      prisma.post
        .findMany({ include: { User: true } })
        .then((posts) => {
          return res
            .status(200)
            .json({ message: "Get all post", data: { posts } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });

    app.get("/post/:id", (req, res) => {
      let id = -1;
      try {
        id = parseInt(req.params.id);
      } catch (error) {
        return res.status(500).json({ message: "id must be number" });
      }
      prisma.post
        .findFirst({ include: { User: true }, where: { id: id } })
        .then((post) => {
          return res
            .status(200)
            .json({ message: `Get post by id ${id}`, data: { post: post } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });

    app.post("/post", (req, res) => {
      let post = req.body as PostBody;
      prisma.post
        .create({
          data: {
            name: post.name,
            userId: post.userId,
          },
        })
        .then((post) => {
          return res
            .status(200)
            .json({ message: `Add new post`, data: { post } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });
  }
}
