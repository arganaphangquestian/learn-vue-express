import axios from "axios";

type Post = {
  id: number;
  title: string;
  authorId: number;
  published: boolean;
};

export const getPosts = async () => {
  const response = await axios.get("http://127.0.0.1:8000/post");
  return response.data.data.posts as Post[];
};

export const addPost = (title: string, authorId: number) => {
  return axios.post("http://127.0.0.1:8000/post", {
    title,
    authorId,
  });
};
