import express from "express";
import { errorHandler } from "@/middlewares";
import { childrenRoutes, authRoutes } from "@/routes";
import { PORT } from "@/settings.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Everything is OK!");
});
app.use("/children", childrenRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
