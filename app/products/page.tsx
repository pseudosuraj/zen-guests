import ProductsHero from "@/components/marketing/products/ProductsHero";
import FeatureSection from "@/components/marketing/products/FeatureSection";
import { TrendingUp, Zap, Star } from "lucide-react";

export default function ProductsPage() {
  return (
    <main className="flex-grow pt-20">
      <ProductsHero />
      <FeatureSection
        title="Revenue Engine"
        subtitle="Maximize every stay with instant up-sell tools, automatic revenue tracking, and a seamless guest purchase experience."
        img="/images/products-revenue-engine.png"
        featureList={
          <ul className="list-disc ml-5 text-primary-blue">
            <li>Launch offers and up-sells in seconds—no IT support needed</li>
            <li>Every guest sees only what's relevant for their room and booking</li>
            <li>Real-time notifications for every purchase</li>
            <li>Fully integrated UPI & digital payments</li>
          </ul>
        }
        outcomeIcon={<TrendingUp className="w-6 h-6" />}
        outcomeText="+27% Average Increase in Ancillary Revenue"
      />
      <FeatureSection
        reverse
        title="Operational Zen Engine"
        subtitle="No more WhatsApp chaos. Assign, track, and close guest requests from one simple dashboard—everyone's accountable, nothing gets missed."
        img="/images/products-operations-engine.png"
        featureList={
          <ul className="list-disc ml-5 text-primary-blue">
            <li>Centralized, real-time assignment of all guest and housekeeping tasks</li>
            <li>Team progress and completion tracked at every stage</li>
            <li>Automatic alerts for overdue or urgent issues</li>
            <li>Management insights to prevent recurring bottlenecks</li>
          </ul>
        }
        outcomeIcon={<Zap className="w-6 h-6" />}
        outcomeText="5-Minute Average Resolution Time for Guest Requests"
      />
      <FeatureSection
        title="Hyper-Local Experience Engine"
        subtitle="Connect every guest to local cuisine, spa, and curated experiences—your property becomes the centerpiece of their trip."
        img="/images/products-experience-engine.png"
        featureList={
          <ul className="list-disc ml-5 text-primary-blue">
            <li>Dynamic menus, spa, and minibar updated with one tap</li>
            <li>Personalized upsells based on guest preferences</li>
            <li>Integrated feedback and instant review requests</li>
            <li>Direct chat with staff, concierge, or management</li>
          </ul>
        }
        outcomeIcon={<Star className="w-6 h-6" />}
        outcomeText="9.2/10 Average Guest Experience Rating"
      />
      <div className="mb-16" />
    </main>
  );
}
