import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("http://127.0.0.1:8000/user");
  return response.data.data.users;
};

export const addUser = async (email, name) => {
  const response = await axios.user("http://127.0.0.1:8000/user", {
    email,
    name,
  });
  return response.data.data.user;
};
