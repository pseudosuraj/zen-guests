import PricingHero from "@/components/marketing/pricing/PricingHero";
import PricingTiers from "@/components/marketing/pricing/PricingTiers";
import FaqSection from "@/components/marketing/pricing/FaqSection";

export default function PricingPage() {
  return (
    <main className="flex-grow pt-20">
      <PricingHero />
      <PricingTiers />
      <FaqSection />
    </main>
  );
}
