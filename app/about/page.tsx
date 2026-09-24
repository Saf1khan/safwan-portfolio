import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMarquee from "@/components/about/AboutMarquee";
import AboutDetails from "@/components/about/AboutDetails";
import AboutExpertise from "@/components/about/AboutExpertise";
import AboutStats from "@/components/about/AboutStats";
import AboutArsenal from "@/components/about/AboutArsenal";
import SlidingBars from "@/components/ui/SlidingBars";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About | Safwan Khan",
  description:
    "About Safwan Khan — Full-Stack Developer crafting fast, scalable, and immersive digital experiences.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full relative bg-main flex flex-col justify-between">
      <div className="aboutMe pb-44 overflow-hidden">
        <Navbar />
        <AboutHero />
        <AboutMarquee />
        <AboutDetails />
        <AboutExpertise />
        <AboutStats />
        <AboutArsenal />
        <AboutCTA />
        <SlidingBars />
      </div>
      <Footer />
    </main>
  );
}
