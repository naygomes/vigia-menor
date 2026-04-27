"use client";
import { useState, useEffect } from "react";
import { Typography, ChildCard, ChildrenPaginator } from "@/components";
import { useChildren, useAuth } from "@/hooks";
import { IChild, Pagination } from "@/types";

const LABEL = "Crianças com cadastro ativo";

const childClasses = {
  container: "w-full flex flex-col items-center justify-start gap-10 p-4",
  cardContainer: "w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6",
};

export function ChildrenSection() {
  const [childrenData, setChildrenData] = useState<IChild[]>([]);
  const [metaData, setMetaData] = useState<Pagination>({
    total: 0,
    totalPages: 0,
    page: 0,
    limit: 0,
  });

  const [page, setPage] = useState(1);
  const { getChildren } = useChildren();
  const { token } = useAuth();

  useEffect(() => {
    async function handleData() {
      const response = await getChildren({ limit: 8, page });
      if (response) {
        setChildrenData(response?.data);
        setMetaData(response?.meta);
      }
    }
    if (token) {
      handleData();
    }
  }, [token, page]);

  return (
    <div className={childClasses.container}>
      <Typography
        level="h1"
        weight="bold"
        align="center"
        color="text-vm-primary"
      >
        {LABEL}
      </Typography>
      <div className={childClasses.cardContainer}>
        {childrenData?.length > 0 &&
          childrenData.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
      </div>

      {metaData.totalPages > 1 && (
        <ChildrenPaginator
          totalPages={metaData.totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
