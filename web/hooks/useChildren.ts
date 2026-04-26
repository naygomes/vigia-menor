"use client";

import { useCallback, useMemo } from "react";
import { useFetch, useAuth } from "@/hooks";
import { CHILDREN_ROUTE, SUMMARY_ENDPOINT } from "@/settings";
import { IGetChildrenParams } from "@/types";

export function useChildren() {
  const { token } = useAuth();
  const { get } = useFetch({ baseURL: CHILDREN_ROUTE });

  const customHeaders = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token],
  );

  const getChildren = useCallback(
    async (params: IGetChildrenParams = {}) => {
      if (!token) return;
      try {
        const response = await get({
          endpoint: "",
          params: {
            ...params.filters,
            page: params.page,
            limit: params.limit,
          },
          customHeaders,
        });
        return response;
      } catch (error) {
        console.error("Erro ao buscar crianças:", error);
      }
    },
    [get, customHeaders, token],
  );

  const getSummary = useCallback(async () => {
    if (!token) return;

    try {
      const summary = await get({
        endpoint: SUMMARY_ENDPOINT,
        customHeaders,
      });

      return summary;
    } catch (error) {
      console.error("Erro ao buscar resumo:", error);
    }
  }, [get, customHeaders, token]);

  const getChildById = async (id: string) => {
    if (!token) return;

    try {
      const child = await get({
        endpoint: "/" + id,
        customHeaders,
      });

      return child;
    } catch (error) {
      console.error("Erro ao buscar criança:", error);
    }
  };

  return { getChildren, getSummary, getChildById };
}
