import axios from "axios";

export const getUsers = async () => {
  const response = await axios.get("http://127.0.0.1:8000/user");
  return response.data.data.users;
};

export const addUser = async (name, email) => {
  const response = await axios.post("http://127.0.0.1:8000/user", {
    name,
    email,
  });
  return response.data.data.user;
};
