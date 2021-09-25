import axios from "axios";
import { TPost } from "../types";

export const getAllPosts = async () => {
  const response = await axios.get("http://127.0.0.1:8000/post");

  return response.data.data.posts as TPost[];
};

export const addPost = async (name: string, userId: number) => {
  const response = await axios.post("http://127.0.0.1:8000/post", {
    name,
    userId,
  });

  return response.data.data.post as TPost;
};
