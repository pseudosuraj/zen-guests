import ProductHero from '@/components/products/ProductHero'
import FeatureShowcase from '@/components/products/FeatureShowcase'
import PilotOfferSection from '@/components/marketing/homepage/PilotOfferSection'

export default function ProductsPage() {
  return (
    <main className="bg-background pt-20">
      <ProductHero />

      <FeatureShowcase
        imageSrc="/mockups/upsell.png"
        title="The Proactive Upsell Engine"
        description="Stop leaving money on the table. Our AI-powered engine automatically offers the right upsell to the right guest at the right time—from pre-arrival upgrades to in-stay packages."
        bullets={[
          'Personalized offers for every guest',
          'Automated delivery via web & WhatsApp',
          'Full revenue tracking and analytics',
        ]}
      />

      <FeatureShowcase
        imageSrc="/mockups/digital-minibar.png"
        title="The Digital Minibar"
        description="Reinvent your in-room sales. Guests can browse and order from a beautiful digital menu, with every purchase instantly tracked. No more manual checks, no more lost revenue."
        bullets={[
          'Visual menu on guest device',
          'Easy UPI & card payments',
          'Auto-notification to staff and managers',
        ]}
        reverse
      />

      <FeatureShowcase
        imageSrc="/mockups/marketplace.png"
        title="The In-House Marketplace"
        description="Why let guests order from Swiggy? Our marketplace turns your hotel into a premium fulfillment center for local food and services. You control the experience and, for the first time, you earn a commission on every order."
        bullets={[
          'Local F&B, groceries, laundry, and more',
          'Direct hotel commission on all orders',
          'Guest experience stays fully white-labeled',
        ]}
      />

      <FeatureShowcase
        imageSrc="/mockups/tasks.png"
        title="The Staff Task Manager"
        description="End the front desk chaos. Every guest request—from a chat message to a minibar order—is instantly converted into a trackable task and sent to the right staff member’s phone."
        bullets={[
          'Real-time, mobile-first staff assignment',
          'Task tracking, reminders, and fulfillment SLAs',
          'All activity visible to managers and owners',
        ]}
        reverse
      />

      <div className="mt-14">
        <PilotOfferSection />
      </div>
    </main>
  )
}
