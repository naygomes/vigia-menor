"use client";

import { useEffect, useState } from "react";
import { NativeSelect, NativeSelectOption } from "@/components/ui";
import { useChildren } from "@/hooks";

interface IFilterProps {
  neighborhoodsData: string[];
  setChildren: React.Dispatch<React.SetStateAction<any[]>>;
  setMetaData: React.Dispatch<React.SetStateAction<any>>;
}

const DEFAULT_LABEL = "Selecione o bairro...";

export function Filter({
  neighborhoodsData,
  setChildren,
  setMetaData,
}: IFilterProps) {
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [hasAlerts, setHasAlerts] = useState<boolean>();
  const [wasReviewed, setWasReviewed] = useState<boolean>();
  const { getChildren } = useChildren();

  useEffect(() => {
    if (neighborhood) {
      async function fetchFilteredChildren() {
        const filters = {
          ...(neighborhood && { neighborhood }),
          ...(hasAlerts !== undefined && { hasAlerts }),
          ...(wasReviewed !== undefined && { wasReviewed }),
        };

        const response = await getChildren({
          filters,
          limit: 8,
          page: 1,
        });
        if (response) {
          setChildren(response.data);
          setMetaData(response.meta);
        }
      }
      fetchFilteredChildren();
    }
  }, [neighborhood]);

  return (
    <div className="w-full p-8 border border-vm-primary rounded-xl w-19/20 flex flex-col md:flex-row items-center justify-between gap-4">
      <NativeSelect
        className="w-full sm:w-[300px]"
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
    </div>
  );
}
