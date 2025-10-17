import ProductsHero from "@/components/marketing/products/ProductsHero";
import FeatureSection from "@/components/marketing/products/FeatureSection";

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <FeatureSection
        imageSrc="/images/product-revenue-engine.png"
        title="The Ancillary Revenue Engine"
        description="Turn Every Stay into a High-Value Transaction. Go beyond static offers with an intelligent system that presents the right upsell at the right time."
        features={[
          "AI-Powered Upselling",
          "The Digital Minibar",
          "Intelligent Dynamic Bundling"
        ]}
      />
      <FeatureSection
        imageSrc="/images/product-operations-engine.png"
        title="The Operational Zen Engine"
        description="Eliminate Chaos. Empower Your Staff. Every guest request is instantly converted into a clear, trackable task, managed from one unified inbox."
        features={[
          "The Unified Inbox",
          "The Digital Task Manager",
          "The Simple Staff Portal"
        ]}
        reversed
      />
      <FeatureSection
        imageSrc="/images/product-experience-engine.png"
        title="The Hyper-Local Experience Engine"
        description="Become the Ultimate Concierge for Your City. We turn external food orders into a premium, in-house service that you control and profit from."
        features={[
          "The Zen-Concierge Marketplace",
          "The AI Itinerary Planner"
        ]}
      />
    </>
  );
}
