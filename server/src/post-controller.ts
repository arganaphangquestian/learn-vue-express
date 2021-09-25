import { Express } from "express";
import PostRepo, { PostBody } from "./repository/post-repo";

export default class PostController {
  constructor(app: Express) {
    app.get("/post", (_req, res) => {
      PostRepo.getAllPosts()
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
      PostRepo.getPostByID(id)
        .then((post) => {
          return res
            .status(200)
            .json({ message: `Get post by id ${id}`, data: { post: post } });
        })
        .catch((e: Error) => {
          return res.status(500).json({ message: `Error : ${e}` });
        });
    });

    app.delete("/post/:id", (req, res) => {
      let id = -1;
      try {
        id = parseInt(req.params.id);
      } catch (error) {
        return res.status(500).json({ message: "id must be number" });
      }
    });

    app.post("/post", (req, res) => {
      let post = req.body as PostBody;
      PostRepo.createPost(post)
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
