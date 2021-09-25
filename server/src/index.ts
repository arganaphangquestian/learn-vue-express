import express from "express";
import cors from "cors";
import { json } from "body-parser";
import PostController from "./post-controller";
import UserController from "./user-controller";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(json());

app.get("/", (_req, res) => {
  res.json({ message: "App is running" });
});

new UserController(app);
new PostController(app);

app.listen(PORT, () => {
  console.log(`🔥 Server is Running`);
});
