import CurveEntrance from "@/components/ui/CurveEntrance";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import HomeIntro from "@/components/ui/HomeIntro";
import SlidingBars from "@/components/ui/SlidingBars";
import ProfileStory from "@/components/ui/ProfileStory";
import WorksSection from "@/components/ui/WorksSection";
import ExperienceSection from "@/components/ui/ExperienceSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative bg-main">
      <CurveEntrance />
      <Navbar />
      <Hero />
      <HomeIntro />
      <ProfileStory />
      <WorksSection />
      <ExperienceSection />
      <SlidingBars />
      <Footer />
    </main>
  );
}

