import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "./main.css";

const client = new QueryClient({});

ReactDOM.render(
  <QueryClientProvider client={client}>
    <p>Hello World</p>
  </QueryClientProvider>,
  document.getElementById("root")
);
