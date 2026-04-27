"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Typography,
  AlertSection,
  Button,
} from "@/components";
import { IChild } from "@/types";

interface IChildCardProps {
  child: IChild;
}

export function ChildCard({ child }: IChildCardProps) {
  const router = useRouter();
  const { saude, educacao, assistencia_social } = child;
  const [alerts, setAlerts] = useState({
    health: saude?.alertas || [],
    education: educacao?.alertas || [],
    assistance: assistencia_social?.alertas || [],
  });

  const handleSeeMore = () => {
    router.push(`/child?id=${child.id}`);
  };

  useEffect(() => {
    function fetchAlerts() {
      const fetchedAlerts = {
        health: saude?.alertas || [],
        education: educacao?.alertas || [],
        assistance: assistencia_social?.alertas || [],
      };
      setAlerts(fetchedAlerts);
    }
    fetchAlerts();
  }, [child]);

  if (!child) return null;

  return (
    <Card key={child.id} className="w-full h-full">
      <CardHeader>
        <CardTitle align="center">{child.nome}</CardTitle>
        <Typography
          align="center"
          color="text-vm-navy"
          className="sm:text-sm"
          weight="semibold"
        >
          {child.bairro}
        </Typography>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <AlertSection alerts={alerts} />
        <Button className="w-full mt-auto" onClick={handleSeeMore}>
          Ver mais
        </Button>
      </CardContent>
    </Card>
  );
}
