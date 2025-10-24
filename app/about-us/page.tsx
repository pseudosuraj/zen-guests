import AboutHero from "@/components/marketing/about-us/AboutHero";
import FounderStory from "@/components/marketing/about-us/FounderStory";
import CtaSection from "@/components/marketing/shared/CtaSection";

export default function AboutUsPage() {
  return (
    <main className="pt-20">
      <AboutHero />
      <FounderStory />
      <CtaSection />
    </main>
  );
}
