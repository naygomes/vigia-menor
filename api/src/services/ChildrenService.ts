import {
  IChild,
  IChildrenRepository,
  IFindAllParams,
  IFindAllResponse,
  IGetSummaryResponse,
} from "@/types";
import { isValidEmail } from "@/utils";

export class ChildrenService {
  constructor(private childrenRepository: IChildrenRepository) {}

  async findAll(params: IFindAllParams = {}): Promise<IFindAllResponse | null> {
    const isInvalidPage =
      params.page !== undefined && (isNaN(params.page) || params.page < 1);
    if (isInvalidPage) {
      throw new Error(
        "Ação inválida: O número da página deve ser um valor numérico maior que zero.",
      );
    }

    const isInvalidLimit =
      params.limit !== undefined && (isNaN(params.limit) || params.limit < 1);
    if (isInvalidLimit) {
      throw new Error(
        "Ação inválida: O limite de itens deve ser um valor numérico maior que zero.",
      );
    }

    const MAX_LIMIT = 50;
    if (params.limit && params.limit > MAX_LIMIT) {
      params.limit = MAX_LIMIT;
    }
    return this.childrenRepository.findAll(params);
  }

  async findById(id: string): Promise<IChild | null> {
    return this.childrenRepository.findById(id);
  }
}
