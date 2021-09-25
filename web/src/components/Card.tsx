import React from "react";

type CardProps = {
  name: string;
  tag: string;
};

const Card: React.FC<CardProps> = ({ name, tag }) => {
  return (
    <div className="flex w-full justify-between border border-gray-200 shadow-none transition-shadow hover:shadow-md rounded-md py-4 px-8 mb-4">
      <p className="flex-1">{name}</p>
      <p className="py-1 px-2 rounded-full bg-blue-300 text-white text-xs">
        {tag}
      </p>
    </div>
  );
};

export default Card;
