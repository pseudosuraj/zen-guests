import HeroSection from "@/components/marketing/homepage/HeroSection";
import RevenueCalculator from "@/components/marketing/homepage/RevenueCalculator";
import ProblemSolutionSection from "@/components/marketing/homepage/ProblemSolutionSection";
import HowItWorksSection from "@/components/marketing/homepage/HowItWorksSection";
import FounderMissionSection from "@/components/marketing/homepage/FounderMissionSection";
import FeatureHighlightsSection from "@/components/marketing/homepage/FeatureHighlightsSection";
import PilotOfferSection from "@/components/marketing/homepage/PilotOfferSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="my-16" />
      <RevenueCalculator />
      <div className="my-16" />
      <ProblemSolutionSection />
      <div className="my-16" />
      <HowItWorksSection />
      <div className="my-16" />
      <FounderMissionSection />
      <div className="my-16" />
      <FeatureHighlightsSection />
      <div className="my-16" />
      <PilotOfferSection />
      <div className="mb-10" />
    </>
  );
}
