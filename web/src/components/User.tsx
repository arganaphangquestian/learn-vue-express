import React from "react";
import { getAllUsers } from "../network/user";
import { useQuery } from "react-query";
import Card from "./Card";
import InputUser from "./InputUser";

const User: React.FC = () => {
  const user = useQuery("getAllUsers", getAllUsers, { retry: 10 });

  if (user.isLoading) return <p>Loading......</p>;

  if (user.isError) return <pre>{JSON.stringify(user.error, null, 2)}</pre>;

  return (
    <div>
      <InputUser />
      <ul className="mt-4">
        {user.data?.map((user, key) => (
          <Card name={user.name} tag={`${user.id}`} key={key} />
        ))}
      </ul>
    </div>
  );
};

export default User;
