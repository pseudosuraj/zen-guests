import HeroSection from "@/components/marketing/homepage/HeroSection";
import TrustBar from "@/components/marketing/homepage/TrustBar";
import ProblemSolutionSection from "@/components/marketing/homepage/ProblemSolutionSection";
import HowItWorksSection from "@/components/marketing/homepage/HowItWorksSection";
import FeatureHighlightsSection from "@/components/marketing/homepage/FeatureHighlightsSection";
import PilotProofSection from "@/components/marketing/homepage/PilotProofSection";
import PilotOfferSection from "@/components/marketing/homepage/PilotOfferSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <div className="my-16" />
      <ProblemSolutionSection />
      <div className="my-16" />
      <HowItWorksSection />
      <div className="my-16" />
      <FeatureHighlightsSection />
      <div className="my-16" />
      <PilotProofSection />
      <div className="my-16" />
      <PilotOfferSection />
      <div className="mb-10" />
    </>
  );
}
