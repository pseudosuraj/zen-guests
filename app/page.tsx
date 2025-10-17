import HeroSection from "@/components/marketing/homepage/HeroSection";
import ProblemSolutionSection from "@/components/marketing/homepage/ProblemSolutionSection";
import HowItWorksSection from "@/components/marketing/homepage/HowItWorksSection";
import FeatureHighlightsSection from "@/components/marketing/homepage/FeatureHighlightsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="my-16" />
      <ProblemSolutionSection />
      <div className="my-16" />
      <HowItWorksSection />
      <div className="my-16" />
      <FeatureHighlightsSection />
      <div className="mb-10" />
    </>
  );
}
