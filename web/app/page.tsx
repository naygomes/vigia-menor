"use client";

import { useEffect, useState } from "react";
import { Navbar, ChildrenSection, Footer } from "@/components";
import { useChildren, useAuth } from "@/hooks";
import { IGetSummaryResponse } from "@/types";

export default function Home() {
  const { getSummary } = useChildren();
  const { token } = useAuth();
  const [summary, setSummary] = useState<IGetSummaryResponse | null>(null);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);

  useEffect(() => {
    async function handleData() {
      const response = await getSummary();
      if (response) {
        setSummary(response);
      }
    }
    if (token) {
      handleData();
    }
  }, [token]);

  useEffect(() => {
    if (summary?.alerts?.perNeighborhood) {
      const neighborhoodsList = Object.keys(summary.alerts.perNeighborhood);
      setNeighborhoods(neighborhoodsList);
    }
  }, [summary]);

  return (
    <div className="bg-vm-background w-screen h-screen overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen h-fit flex flex-col items-center justify-start gap-10 pt-40 px-4">
        <ChildrenSection neighborhoods={neighborhoods} />
        <Footer />
      </div>
    </div>
  );
}
