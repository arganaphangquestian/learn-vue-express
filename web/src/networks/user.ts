import axios from "axios";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const getUsers = async () => {
  const response = await axios.get("http://127.0.0.1:8000/user");
  return response.data.data.users as User[];
};

export const addUser = async (name: string, email: string) => {
  const response = await axios.post("http://127.0.0.1:8000/user", {
    name,
    email,
  });
  return response.data.data.user as User;
};
