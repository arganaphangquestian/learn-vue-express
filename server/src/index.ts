import express from "express";

const app = express();
const PORT = 8000; // process.env.PORT

app.get("/", (req, res) => {
  res.json({ message: "App is Running" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
