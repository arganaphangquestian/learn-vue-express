import { getUsers } from "@/networks/user";
import React from "react";
import { useQuery } from "react-query";
import InputUser from "./InputUser";

const User = () => {
  const { data, isLoading, isError } = useQuery("users", getUsers);

  if (isLoading) <p>Loading . . .</p>;
  if (isError) <p>Error . . .</p>;

  return (
    <div>
      <InputUser />
      <ul>
        {data?.map((user, key) => (
          <li key={key} className="px-4 py-2 mt-4 rounded-md shadow-md">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
