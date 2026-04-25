import {
  IChild,
  IChildrenRepository,
  IFindAllParams,
  IFindAllResponse,
  IGetSummaryResponse,
} from "@/types";
import { isValidEmail } from "@/utils";
import { BadRequestError, NotFoundError } from "@/errors";

export class ChildrenService {
  constructor(private childrenRepository: IChildrenRepository) {}

  async findAll(params: IFindAllParams = {}): Promise<IFindAllResponse | null> {
    const isInvalidPage =
      params.page !== undefined && (isNaN(params.page) || params.page < 1);
    if (isInvalidPage) {
      throw new BadRequestError(
        "Ação inválida: O número da página deve ser um valor numérico maior que zero.",
      );
    }

    const isInvalidLimit =
      params.limit !== undefined && (isNaN(params.limit) || params.limit < 1);
    if (isInvalidLimit) {
      throw new BadRequestError(
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

  async getSummary(): Promise<IGetSummaryResponse | null> {
    return this.childrenRepository.getSummary();
  }

  private isCorporateEmail(email: string): boolean {
    return email.endsWith("@prefeitura.rio");
  }

  private getTotalAlerts(child: IChild): number {
    return (
      (child.saude?.alertas?.length || 0) +
      (child.educacao?.alertas?.length || 0) +
      (child.assistencia_social?.alertas?.length || 0)
    );
  }

  async review(id: string, technicalEmail: string): Promise<IChild> {
    if (!isValidEmail(technicalEmail)) {
      throw new BadRequestError(
        "Acesso negado: E-mail inválido. Tente novamente com outro e-mail.",
      );
    }
    if (!this.isCorporateEmail(technicalEmail)) {
      throw new BadRequestError(
        "Acesso negado: Apenas e-mails corporativos (@prefeitura.rio) podem realizar revisões.",
      );
    }

    const child = await this.childrenRepository.findById(id);
    if (!child) {
      throw new NotFoundError("Criança não encontrada.");
    }
    if (this.getTotalAlerts(child) === 0) {
      throw new BadRequestError(
        "Ação inválida: Esta criança não possui alertas a serem revisados.",
      );
    }

    const updatedChild = await this.childrenRepository.review(
      id,
      technicalEmail,
    );
    if (!updatedChild) {
      throw new Error("Erro interno: Falha ao atualizar o status da criança.");
    }

    return updatedChild;
  }
}
