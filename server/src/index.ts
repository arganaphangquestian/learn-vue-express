import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { json } from "body-parser";
import type { TPost, TUser } from "./types";

const app = express();
const PORT = 8000; // process.env.PORT
const prisma = new PrismaClient();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "App is Running" });
});

app.get("/post", async (req, res) => {
  prisma.post
    .findMany()
    .then((posts) => {
      res.json({ message: "Get all post", data: { posts } });
    })
    .catch((e) => {
      res.json({ message: "Something went wrong" });
    });
});

app.get("/post/:id", (req, res) => {
  let id: number;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    res.json({ message: "post param must be number" });
    return;
  }
  prisma.post
    .findFirst({ where: { id: id } })
    .then((post) => {
      res.json({ message: `Get post by id ${id}`, data: { post } });
    })
    .catch((e) => {
      res.json({ message: "Something went wrong" });
    });
});

app.post("/post", async (req, res) => {
  const post: TPost = req.body;
  prisma.post
    .create({ data: { ...post } })
    .then((data) => {
      res.json({ message: "Add new post", data: { post: data } });
    })
    .catch((e) => {
      res.json({ message: "New post failed" });
    });
});

app.get("/user", async (req, res) => {
  prisma.user
    .findMany({ include: { posts: true } })
    .then((users) => {
      res.json({ message: "Get all user", data: { users } });
    })
    .catch((e) => {
      res.json({ message: "Something went wrong" });
    });
});

app.get("/user/:id", (req, res) => {
  let id: number;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    res.json({ message: "user param must be number" });
    return;
  }
  prisma.user
    .findFirst({ where: { id: id } })
    .then((user) => {
      res.json({ message: `Get user by id ${id}`, data: { user } });
    })
    .catch((e) => {
      res.json({ message: "Something went wrong" });
    });
});

app.post("/user", async (req, res) => {
  const user: TUser = req.body;
  prisma.user
    .create({ data: { ...user } })
    .then((data) => {
      res.json({ message: "Add new user", data: { user: data } });
    })
    .catch((e) => {
      res.json({ message: "New user failed" });
    });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
