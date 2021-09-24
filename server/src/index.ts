import express from "express";
import cors from "cors";
import { json } from "body-parser";

const app = express();
const PORT = 8000; // process.env.PORT

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "App is Running" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
