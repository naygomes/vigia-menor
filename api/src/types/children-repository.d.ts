import { IChild, Pagination } from "./index.ts";

export interface IFindAllParams {
  filters?: IFindAllFilters;
  page?: number;
  limit?: number;
}
export interface IFindAllFilters {
  neighborhood?: string;
  hasAlerts?: boolean;
  wasReviewed?: boolean;
}

export interface IFindAllResponse {
  data: IChild[];
  meta: Pagination;
}

export interface IGetAlertSummary {
  health: number;
  education: number;
  socialAssistance: number;
  perNeighborhood: Record<string, number>;
}
export interface IGetSummaryResponse {
  childrenTotal: number;
  reviewedTotal: number;
  alerts: IGetAlertSummary;
}
