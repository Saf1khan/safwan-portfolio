import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import HomeIntro from "@/components/ui/HomeIntro";
// import SlidingBars from "@/components/ui/SlidingBars";
import ProfileStory from "@/components/ui/ProfileStory";
import WorksSection from "@/components/ui/WorksSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative bg-main">
      <Navbar />
      <Hero />
      <HomeIntro />
      {/* SlidingBars temporarily hidden; will be repositioned above the footer later */}
      {/* <SlidingBars /> */}
      <ProfileStory />
      <WorksSection />
    </main>
  );
}
