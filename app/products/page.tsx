import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { TrendingUp, Zap, Star } from "lucide-react";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 max-w-4xl mx-auto px-4">
        {/* Hero */}
        <section className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The Zen-Guests platform brings delight and efficiency to every stay. Explore our three core solutions—designed for maximum revenue, perfect operations, and unforgettable local guest experiences.
          </p>
        </section>
        {/* Revenue Engine */}
        <section className="flex flex-col md:flex-row items-center gap-6 mb-16">
          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Revenue Engine
            </h2>
            <p className="mb-2 text-gray-700">
              Maximize every stay with instant up-sell tools, automatic revenue tracking, and a seamless guest purchase experience.
            </p>
            <ul className="list-disc ml-5 text-primary-blue text-sm mb-2">
              <li>Launch offers and up-sells in seconds—no IT support needed</li>
              <li>Every guest sees only what's relevant for their room and booking</li>
              <li>Real-time notifications for every purchase</li>
              <li>Fully integrated UPI & digital payments</li>
            </ul>
            <div className="mt-2 text-sm">
              <span className="inline-flex items-center gap-2 text-green-700">
                <TrendingUp className="w-5 h-5" />
                +27% Average Increase in Ancillary Revenue
              </span>
            </div>
          </div>
          <img
            src="/images/products-revenue-engine.png"
            alt="Revenue Engine"
            className="w-[300px] h-[220px] object-contain rounded-xl bg-white border"
          />
        </section>
        {/* Operational Zen Engine */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-6 mb-16">
          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Operational Zen Engine
            </h2>
            <p className="mb-2 text-gray-700">
              No more WhatsApp chaos. Assign, track, and close guest requests from one simple dashboard—everyone's accountable, nothing gets missed.
            </p>
            <ul className="list-disc ml-5 text-primary-blue text-sm mb-2">
              <li>Centralized, real-time assignment of all guest and housekeeping tasks</li>
              <li>Team progress and completion tracked at every stage</li>
              <li>Automatic alerts for overdue or urgent issues</li>
              <li>Management insights to prevent recurring bottlenecks</li>
            </ul>
            <div className="mt-2 text-sm">
              <span className="inline-flex items-center gap-2 text-blue-700">
                <Zap className="w-5 h-5" />
                5-Minute Average Resolution Time for Guest Requests
              </span>
            </div>
          </div>
          <img
            src="/images/products-operations-engine.png"
            alt="Operations Engine"
            className="w-[300px] h-[220px] object-contain rounded-xl bg-white border"
          />
        </section>
        {/* Hyper-Local Experience Engine */}
        <section className="flex flex-col md:flex-row items-center gap-6 mb-16">
          <div className="flex-1">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Star className="w-6 h-6 text-orange-600" />
              Hyper-Local Experience Engine
            </h2>
            <p className="mb-2 text-gray-700">
              Connect every guest to local cuisine, spa, and curated experiences—your property becomes the centerpiece of their trip.
            </p>
            <ul className="list-disc ml-5 text-primary-blue text-sm mb-2">
              <li>Dynamic menus, spa, and minibar updated with one tap</li>
              <li>Personalized upsells based on guest preferences</li>
              <li>Integrated feedback and instant review requests</li>
              <li>Direct chat with staff, concierge, or management</li>
            </ul>
            <div className="mt-2 text-sm">
              <span className="inline-flex items-center gap-2 text-purple-700">
                <Star className="w-5 h-5" />
                9.2/10 Average Guest Experience Rating
              </span>
            </div>
          </div>
          <img
            src="/images/products-experience-engine.png"
            alt="Experience Engine"
            className="w-[300px] h-[220px] object-contain rounded-xl bg-white border"
          />
        </section>
        <div className="mb-16" />
      </main>
      <Footer />
    </>
  );
}
