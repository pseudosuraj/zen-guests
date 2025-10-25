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
      {/* White */}
      <HeroSection />
      
      {/* Gray */}
      <div className="bg-slate-50">
        <TrustBar />
      </div>
      
      <div className="my-16" />
      
      {/* White */}
      <ProblemSolutionSection />
      
      <div className="my-16" />
      
      {/* Gray */}
      <div className="bg-slate-50">
        <HowItWorksSection />
      </div>
      
      <div className="my-16" />
      
      {/* White */}
      <FeatureHighlightsSection />
      
      <div className="my-16" />
      
      {/* Gray */}
      <div className="bg-slate-50">
        <PilotProofSection />
      </div>
      
      <div className="my-16" />
      
      {/* White */}
      <PilotOfferSection />
      
      <div className="mb-10" />
    </>
  );
}
