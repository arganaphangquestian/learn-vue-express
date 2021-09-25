import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "./main.css";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import User from "./components/User";
import Post from "./components/Post";

const client = new QueryClient({});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const App: React.FC = () => {
  let [pages] = useState({
    User: <User />,
    Post: <Post />,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-200 rounded-xl">
            {Object.keys(pages).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected ? "bg-white shadow" : "text-blue-100"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(pages).map((page, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                {page}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
