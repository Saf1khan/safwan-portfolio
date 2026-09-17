import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import HomeIntro from "@/components/ui/HomeIntro";
import SlidingBars from "@/components/ui/SlidingBars";
import ProfileStory from "@/components/ui/ProfileStory";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative bg-main">
      <Navbar />
      <Hero />
      <HomeIntro />
      <SlidingBars />
      <ProfileStory />
    </main>
  );
}
