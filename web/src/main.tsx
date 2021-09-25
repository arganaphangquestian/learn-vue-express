import React from "react";
import ReactDOM from "react-dom";
import { Tab } from "@headlessui/react";
import User from "./components/User";
import Post from "./components/Post";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const App: React.FC = () => {
  const [pages] = React.useState([
    {
      label: "User",
      page: <User />,
    },
    {
      label: "Post",
      page: <Post />,
    },
  ]);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-300 rounded-xl">
            {pages.map((page, key) => (
              <Tab
                key={key}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected ? "bg-white shadow" : "text-blue-100"
                  )
                }
              >
                {page.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {pages.map((page, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "bg-white rounded-xl p-3",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
              >
                {page.page}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
