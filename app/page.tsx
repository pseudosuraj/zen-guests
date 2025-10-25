import NewHero from "@/components/marketing/homepage/NewHero";
import BentoGrid from "@/components/marketing/homepage/BentoGrid";
import HowItWorksSection from "@/components/marketing/homepage/HowItWorksSection";
import FeatureShowcase from "@/components/marketing/homepage/FeatureShowcase";
import PilotOfferSection from "@/components/marketing/homepage/PilotOfferSection";

export default function Home() {
  return (
    <main className="bg-background">
      <NewHero />
      
      <BentoGrid />
      
      <HowItWorksSection />
      
      <FeatureShowcase />
      
      <PilotOfferSection />
      
      <div className="mb-20" />
    </main>
  );
}
