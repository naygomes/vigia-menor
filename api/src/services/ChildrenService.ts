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
