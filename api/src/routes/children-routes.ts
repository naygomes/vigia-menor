import { Router } from "express";
import { InMemoryChildrenRepository } from "@/repositories";
import { ChildrenService } from "@/services";
import { ChildrenController } from "@/controllers";
import { ensureAuthenticated } from "@/middlewares";

const childrenRoutes = Router();

const childrenRepository = new InMemoryChildrenRepository();
const childrenService = new ChildrenService(childrenRepository);
const childrenController = new ChildrenController(childrenService);

childrenRoutes.use(ensureAuthenticated);

childrenRoutes.get("/", childrenController.findAll);
childrenRoutes.get("/summary", childrenController.getSummary);
childrenRoutes.get("/:id", childrenController.findById);
childrenRoutes.patch("/:id/review", childrenController.review);

export { childrenRoutes };
