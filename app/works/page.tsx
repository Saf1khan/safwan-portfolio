import React from "react";
import type { Metadata } from "next";
import CurveEntrance from "@/components/ui/CurveEntrance";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WorksHero from "@/components/works/WorksHero";
import WorksFlowingList from "@/components/works/WorksFlowingList";

export const metadata: Metadata = {
  title: "Works | Safwan Khan",
  description:
    "Discover the latest projects and creative solutions by Safwan Khan — Full-Stack Developer and UI/UX Designer.",
};

export default function WorksPage() {
  return (
    <main className="min-h-screen w-full relative bg-main flex flex-col justify-between">
      <CurveEntrance text="work" />
      <div className="worksPage pb-44 overflow-hidden">
        <Navbar />
        <WorksHero />
        <WorksFlowingList />
      </div>
      <Footer />
    </main>
  );
}
