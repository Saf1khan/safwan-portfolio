import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import HomeIntro from "@/components/ui/HomeIntro";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative bg-main">
      <Navbar />
      <Hero />
      <HomeIntro />
    </main>
  );
}
