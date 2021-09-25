import React from "react";
import { useQuery } from "react-query";
import { getAllPosts } from "../network/post";
import Card from "./Card";
import InputPost from "./InputPost";

const Post: React.FC = () => {
  const posts = useQuery("getAllPosts", getAllPosts, { retry: 10 });

  if (posts.isLoading) return <p>Loading......</p>;

  if (posts.isError) return <pre>{JSON.stringify(posts.error, null, 2)}</pre>;

  return (
    <div>
      <InputPost />
      <ul className="mt-4">
        {posts.data?.map((post, key) => (
          <Card name={post.name} tag={post.User?.name ?? ""} key={key} />
        ))}
      </ul>
    </div>
  );
};

export default Post;
