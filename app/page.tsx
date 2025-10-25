import AnimatedHero from "@/components/marketing/homepage/AnimatedHero";
import NewTrustBar from "@/components/marketing/homepage/NewTrustBar";
import InteractiveShowcase from "@/components/marketing/homepage/InteractiveShowcase";
import HowItWorksSection from "@/components/marketing/homepage/HowItWorksSection";
import PilotOfferSection from "@/components/marketing/homepage/PilotOfferSection";

export default function Home() {
  return (
    <main className="bg-background">
      <AnimatedHero />
      
      <NewTrustBar />
      
      <InteractiveShowcase />
      
      <HowItWorksSection />
      
      <PilotOfferSection />
      
      <div className="mb-20" />
    </main>
  );
}
