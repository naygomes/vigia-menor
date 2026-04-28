import { Typography, Card, CardContent, Badge } from "@/components";
import { IChild } from "@/types";
import { formatDate } from "@/utils";

interface IChildInfoProps {
  child: IChild;
}

export function ChildInfo({ child }: IChildInfoProps) {
  const {
    nome,
    responsavel,
    bairro,
    data_nascimento,
    revisado,
    revisado_por,
    revisado_em,
  } = child;

  const formattedBirthDate = formatDate(data_nascimento);
  const formattedRevisionDate = revisado_em ? formatDate(revisado_em) : null;

  const reviewed_label = revisado
    ? "Revisado pela Equipe"
    : "Pendente de Revisão";

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Typography level="h1" weight="bold" color="text-vm-primary">
            {nome}
          </Typography>
          <Typography level="p" className="text-gray-600">
            <b>Responsável:</b> {responsavel} | <b>Bairro:</b> {bairro} |{" "}
            <b>Nascimento:</b> {formattedBirthDate}
          </Typography>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <Badge
            variant={revisado ? "default" : "destructive"}
            className="text-sm px-4 py-2"
          >
            {reviewed_label}
          </Badge>
          {revisado && revisado_por && (
            <Typography level="p" className="text-xs text-gray-400">
              Por: {revisado_por} em {formattedRevisionDate}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
