import { Request, Response } from "express";
import { ChildrenService } from "@/services";
import { BadRequestError, NotFoundError } from "@/errors";
import { IFindAllParams } from "@/types";

export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  findAll = async (req: Request, res: Response) => {
    const { page, limit, neighborhood, wasReviewed, hasAlerts } = req.query;

    if (
      Array.isArray(page) ||
      Array.isArray(limit) ||
      Array.isArray(neighborhood) ||
      Array.isArray(wasReviewed) ||
      Array.isArray(hasAlerts)
    ) {
      throw new BadRequestError("Parâmetros duplicados não são permitidos.");
    }

    const params: IFindAllParams = {
      page: typeof page === "string" ? Number(page as string) : undefined,
      limit: typeof limit === "string" ? Number(limit as string) : undefined,
      filters: {
        neighborhood:
          typeof neighborhood === "string" ? neighborhood : undefined,
        wasReviewed:
          wasReviewed !== undefined
            ? (wasReviewed as string) === "true"
            : undefined,
        hasAlerts:
          hasAlerts !== undefined
            ? (hasAlerts as string) === "true"
            : undefined,
      },
    };

    const result = await this.childrenService.findAll(params);
    res.json(result);
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (Array.isArray(id)) {
      throw new BadRequestError("ID duplicado não é permitido.");
    }

    const child = await this.childrenService.findById(id);
    if (!child) {
      throw new NotFoundError("Criança não encontrada.");
    }

    res.json(child);
  };

  getSummary = async (req: Request, res: Response) => {
    const summary = await this.childrenService.getSummary();
    res.json(summary);
  };
}
