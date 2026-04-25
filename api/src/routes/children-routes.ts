import { Router } from "express";
import { InMemoryChildrenRepository } from "@/repositories";
import { ChildrenService } from "@/services";
import { ChildrenController } from "@/controllers";

const childrenRoutes = Router();

const childrenRepository = new InMemoryChildrenRepository();
const childrenService = new ChildrenService(childrenRepository);
const childrenController = new ChildrenController(childrenService);

childrenRoutes.get("/", childrenController.findAll);
childrenRoutes.get("/summary", childrenController.getSummary);
childrenRoutes.get("/:id", childrenController.findById);
childrenRoutes.patch("/:id/review", childrenController.review);

export { childrenRoutes };
