import { Express } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type UserBody = {
  name: string;
};

export default class UserController {
  constructor(app: Express) {
    app.get("/user", (_req, res) => {
      prisma.user
        .findMany({ include: { posts: true } })
        .then((users) => {
          return res
            .status(200)
            .json({ message: "Get all user", data: { users: users } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });

    app.get("/user/:id", (req, res) => {
      let id = -1;
      try {
        id = parseInt(req.params.id);
      } catch (error) {
        return res.status(500).json({ message: "id must be number" });
      }
      prisma.user
        .findFirst({ include: { posts: true }, where: { id: id } })
        .then((user) => {
          return res
            .status(200)
            .json({ message: `Get user by id ${id}`, data: { user: user } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });

    app.post("/user", (req, res) => {
      let user = req.body as UserBody;
      prisma.user
        .create({
          data: {
            name: user.name,
          },
        })
        .then((user) => {
          return res
            .status(200)
            .json({ message: `Add new user`, data: { user } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });
  }
}
