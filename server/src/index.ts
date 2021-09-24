import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 8000; // process.env.PORT
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({ message: "App is Running" });
});

app.get("/post", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json({ message: "Get all post", data: { posts } });
});

app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json({ message: "Get all post", data: { users } });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
