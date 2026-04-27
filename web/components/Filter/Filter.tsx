"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  NativeSelect,
  NativeSelectOption,
} from "@/components";

interface IFilterProps {
  neighborhoodsData: string[];
  setPage: React.Dispatch<React.SetStateAction<any>>;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const DEFAULT_LABEL = "Selecione o bairro...";
const REVIEWED_LABEL = "Crianças não revisadas pela equipe";
const ALERTS_LABEL = "Crianças com alertas ativos";

export function Filter({
  neighborhoodsData,
  setPage,
  setFilters,
}: IFilterProps) {
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [hasAlerts, setHasAlerts] = useState<boolean>(false);
  const [wasReviewed, setWasReviewed] = useState<boolean>(false);

  useEffect(() => {
    async function updateFilters() {
      const filters = {
        ...(neighborhood && { neighborhood }),
        ...(hasAlerts && { hasAlerts }),
        ...(wasReviewed && { wasReviewed }),
      };

      setFilters(filters);
      setPage(1);
    }
    updateFilters();
  }, [neighborhood, hasAlerts, wasReviewed]);

  const clearFilters = () => {
    setNeighborhood("");
    setHasAlerts(false);
    setWasReviewed(false);
  };

  return (
    <div className="w-full p-8 border border-vm-primary rounded-xl w-19/20 flex flex-col lg:flex-row items-center justify-between gap-4">
      <NativeSelect
        className="w-full"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
      >
        <NativeSelectOption value="" disabled>
          {DEFAULT_LABEL}
        </NativeSelectOption>
        {neighborhoodsData?.map((neighborhood) => (
          <NativeSelectOption key={neighborhood} value={neighborhood}>
            {neighborhood}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <FieldGroup className="w-full flex flex-col md:flex-row items-start">
        <Field orientation="horizontal">
          <Checkbox
            id="alerts-checkbox-basic"
            name="alerts-checkbox-basic"
            checked={hasAlerts}
            onCheckedChange={(checked) => setHasAlerts(checked === true)}
          />
          <FieldLabel htmlFor="alerts-checkbox-basic">
            {ALERTS_LABEL}
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="reviewed-checkbox-basic"
            name="reviewed-checkbox-basic"
            checked={wasReviewed}
            onCheckedChange={(checked) => setWasReviewed(checked === true)}
          />
          <FieldLabel htmlFor="reviewed-checkbox-basic">
            {REVIEWED_LABEL}
          </FieldLabel>
        </Field>
      </FieldGroup>
      <Button variant="outline" onClick={clearFilters}>
        Limpar Filtros
      </Button>
    </div>
  );
}
