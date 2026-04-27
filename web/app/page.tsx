"use client";

import { Navbar, ChildrenSection, Footer } from "@/components";

export default function Home() {
  return (
    <div className="bg-vm-background w-screen h-screen overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen h-fit flex flex-col items-center justify-start gap-10 pt-40 px-4">
        <ChildrenSection />
        <Footer />
      </div>
    </div>
  );
}
