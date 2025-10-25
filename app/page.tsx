import NewHero from "@/components/marketing/homepage/NewHero";
import ShowcaseSection from "@/components/marketing/homepage/ShowcaseSection";
import FeatureGrid from "@/components/marketing/homepage/FeatureGrid";
import HowItWorksSection from "@/components/marketing/homepage/HowItWorksSection";
import PilotOfferSection from "@/components/marketing/homepage/PilotOfferSection";

export default function Home() {
  return (
    <main className="bg-background">
      <NewHero />
      
      <ShowcaseSection />
      
      <FeatureGrid />
      
      <HowItWorksSection />
      
      <PilotOfferSection />
      
      <div className="mb-20" />
    </main>
  );
}
