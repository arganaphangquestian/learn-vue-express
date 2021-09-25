import axios from "axios";
import { TUser } from "../types";

export const getAllUsers = async () => {
  const response = await axios.get("http://127.0.0.1:8000/user");

  return response.data.data.users as TUser[];
};

export const addUser = async (name: string) => {
  const response = await axios.post("http://127.0.0.1:8000/user", {
    name,
  });

  return response.data.data.user as TUser;
};
