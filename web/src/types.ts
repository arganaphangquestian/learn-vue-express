export type TPost = {
  id: number;
  name: string;
  createdAt: string;
  User: TUser;
};
export type TUser = { id: number; name: string };
