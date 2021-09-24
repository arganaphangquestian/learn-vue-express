import axios from "axios";

export const getPosts = async () => {
  const response = await axios.get("http://127.0.0.1:8000/post");
  return response.data.data.posts;
};

export const addPost = async (title, authorId) => {
  const response = await axios.post("http://127.0.0.1:8000/post", {
    title,
    authorId,
  });
  return response.data.data.post;
};
