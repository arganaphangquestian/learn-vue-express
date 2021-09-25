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
      <ul className="mt-4 overflow-y-auto px-4" style={{ height: "600px" }}>
        {data?.map((user, key) => (
          <li
            key={key}
            className="flex border list-none rounded-md px-3 py-3 mb-4 items-center"
          >
            <p className="flex-1">{user.name}</p>
            <p className="text-right bg-blue-300 py-2 px-4 rounded-full text-blue-700 text-xs">
              {user.email}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
