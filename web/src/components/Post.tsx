import { getPosts } from "@/networks/post";
import React from "react";
import { useQuery } from "react-query";
import InputPost from "./InputPost";

const Post = () => {
  const { data, isLoading, isError } = useQuery("posts", getPosts);

  if (isLoading) <p>Loading . . .</p>;
  if (isError) <p>Error . . .</p>;

  return (
    <div>
      <InputPost />
      <ul className="mt-4 overflow-y-auto px-4" style={{ height: "600px" }}>
        {data?.map((post, key) => (
          <li
            key={key}
            className="flex border list-none rounded-md px-3 py-3 mb-4 items-center"
          >
            <p className="flex-1">{post.title}</p>
            <p className="text-right bg-blue-300 py-2 px-4 rounded-full text-blue-700 text-xs">
              {post.published ? `Published` : !post.published ? `Drafted` : ``}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
