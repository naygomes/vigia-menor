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
    if (!technicalEmail || !isValidEmail(technicalEmail)) {
      throw new Error(
        "Acesso negado: E-mail inválido. Tente novamente com outro e-mail.",
      );
    }
    if (!this.isCorporateEmail(technicalEmail)) {
      throw new Error(
        "Acesso negado: Apenas e-mails corporativos (@prefeitura.rio) podem realizar revisões.",
      );
    }

    const child = await this.childrenRepository.findById(id);
    if (!child) {
      throw new Error("Ação inválida: Criança não encontrada.");
    }
    if (child.revisado) {
      throw new Error(
        "Ação inválida: Esta criança já foi revisada e não pode ser alterada.",
      );
    }
    if (this.getTotalAlerts(child) === 0) {
      throw new Error(
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
