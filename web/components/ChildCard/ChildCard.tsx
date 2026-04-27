import { Card, CardHeader, CardTitle, CardContent } from "@/components";
import { IChild } from "@/types";

interface IChildCardProps {
  child: IChild;
}

export function ChildCard({ child }: IChildCardProps) {
  if (!child) return null;
  console.log(child);
  return (
    <Card key={child.id} className="w-full">
      <CardHeader>
        <CardTitle align="center">{child.nome}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Bairro: {child.bairro}</p>
        <p>responsável: {child.responsavel}</p>
      </CardContent>
    </Card>
  );
}
