import express from "express";
import { errorHandler } from "@/middlewares";
import { childrenRoutes } from "@/routes";
import { PORT } from "@/settings.js";

const app = express();

app.use(express.json());
app.use("/children", childrenRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
