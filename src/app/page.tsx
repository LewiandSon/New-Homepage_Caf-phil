import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { QuoteSection } from "@/components/QuoteSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-primary font-serif pt-[150px]">
      <Header />
      <HeroSection />
      <AboutSection />
      <QuoteSection />
    </main>
  );
}
