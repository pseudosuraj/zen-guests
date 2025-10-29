import Hero from '@/components/marketing/homepage/Hero'
import Transformation from '@/components/marketing/homepage/Transformation'
import FeatureShowcase from '@/components/marketing/homepage/FeatureShowcase'
import HowItWorksSection from '@/components/marketing/homepage/HowItWorksSection'
import Mission from '@/components/marketing/homepage/Mission'
import PilotOfferSection from '@/components/marketing/homepage/PilotOfferSection'

export default function HomePage() {
  return (
    <main className="flex-grow">
      <Hero />
      <Transformation />
      <FeatureShowcase />
      <HowItWorksSection />
      <Mission />
      <PilotOfferSection />
    </main>
  )
}
