import express from "express";
import { PORT } from "@/settings.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.send("Everything is OK!");
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
