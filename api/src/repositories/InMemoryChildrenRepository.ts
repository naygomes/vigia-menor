import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadSeedData } from "@/utils";
import {
  IChild,
  IFindAllResponse,
  IFindAllParams,
  IFindAllFilters,
  IGetSummaryResponse,
  IGetAlertSummary,
} from "@/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedPath = path.resolve(__dirname, "../../../data/seed.json");
export class InMemoryChildrenRepository {
  private children: IChild[];

  constructor() {
    this.children = this.loadDb();
  }

  private loadDb(): IChild[] {
    const seedData = loadSeedData(seedPath);

    return seedData;
  }

  private saveToDb() {
    if (seedPath) {
      fs.writeFileSync(
        seedPath,
        JSON.stringify(this.children, null, 2),
        "utf-8",
      );
    }
  }

  private applyFindAllFilters(
    children: IChild[],
    filters: IFindAllFilters,
  ): IChild[] {
    let result = children;

    if (filters.neighborhood) {
      result = result.filter(
        (child) =>
          child.bairro.toLowerCase() === filters.neighborhood!.toLowerCase(),
      );
    }

    if (filters.wasReviewed !== undefined) {
      result = result.filter((child) => child.revisado === filters.wasReviewed);
    }

    if (filters.hasAlerts !== undefined) {
      result = result.filter((child) => {
        const totalAlertas =
          (child.saude?.alertas?.length || 0) +
          (child.educacao?.alertas?.length || 0) +
          (child.assistencia_social?.alertas?.length || 0);

        return filters.hasAlerts ? totalAlertas > 0 : totalAlertas === 0;
      });
    }

    return result;
  }

  private paginateChildren(children: IChild[], page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const paginatedChildren = children.slice(startIndex, startIndex + limit);

    return paginatedChildren;
  }

  async findAll({
    filters,
    page = 1,
    limit = 10,
  }: IFindAllParams = {}): Promise<IFindAllResponse | null> {
    let result = [...this.children];

    if (filters) result = this.applyFindAllFilters(result, filters);
    const paginatedChildren = this.paginateChildren(result, page, limit);

    return {
      data: paginatedChildren,
      meta: {
        total: result.length,
        page,
        limit,
        totalPages: Math.ceil(result.length / limit),
      },
    };
  }

  async findById(id: string): Promise<IChild | null> {
    return this.children.find((child) => child.id === id) || null;
  }

  private countReviewed(): number {
    return this.children.filter((child) => child.revisado).length;
  }

  private getAlertsSummary(): IGetAlertSummary {
    const alerts = {
      health: 0,
      education: 0,
      socialAssistance: 0,
      perNeighborhood: {} as Record<string, number>,
    };

    for (const child of this.children) {
      let hasAlert = false;
      if (child.saude?.alertas?.length) {
        alerts.health++;
        hasAlert = true;
      }
      if (child.educacao?.alertas?.length) {
        alerts.education++;
        hasAlert = true;
      }
      if (child.assistencia_social?.alertas?.length) {
        alerts.socialAssistance++;
        hasAlert = true;
      }

      if (hasAlert) {
        const bairro = child.bairro;
        alerts.perNeighborhood[bairro] =
          (alerts.perNeighborhood[bairro] || 0) + 1;
      }
    }
    return alerts;
  }

  async getSummary(): Promise<IGetSummaryResponse | null> {
    const alertsSummary = this.getAlertsSummary();

    return {
      childrenTotal: this.children.length,
      reviewedTotal: this.countReviewed(),
      alerts: alertsSummary,
    };
  }

  async review(id: string, technicalEmail: string): Promise<IChild | null> {
    const index = this.children.findIndex((c) => c.id === id);
    if (index === -1) return null;

    this.children[index] = {
      ...this.children[index],
      revisado: true,
      revisado_por: technicalEmail,
      revisado_em: new Date().toISOString(),
    };
    this.saveToDb();
    return this.children[index];
  }
}
