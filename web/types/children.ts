interface IHealth {
  ultima_consulta: string;
  vacinas_em_dia: boolean;
  alertas: string[];
}

interface IEducation {
  escola: string | null;
  frequencia_percent: number | null;
  alertas: string[];
}

interface ISocialAssistance {
  cad_unico: boolean;
  beneficio_ativo: boolean;
  alertas: string[];
}

export interface IChild {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: IHealth | null;
  educacao: IEducation | null;
  assistencia_social: ISocialAssistance | null;
  revisado: boolean;
  revisado_por: string | null;
  revisado_em: string | null;
}

export interface IGetChildrenParams {
  filters?: IFindAllFilters;
  page?: number;
  limit?: number;
}
export interface IFindAllFilters {
  neighborhood?: string;
  hasAlerts?: boolean;
  wasReviewed?: boolean;
}
