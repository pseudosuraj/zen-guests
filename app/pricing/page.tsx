'use client';

import { Button } from '@/components/ui/button';

const PRIMARY_PURPLE = 'bg-[#6C63FF]'; // Zen-Guests main
const HOVER_PURPLE = 'hover:bg-[#554bdd]'; // Darker Zen-Guests for hover
const TEXT_PURPLE = 'text-[#6C63FF]'; // Use for headings & accents

const pricingTiers = [
  {
    name: 'Launchpad Kit',
    price: '₹999 / month',
    value: 'The New Revenue Stream',
    target: '10-30 room budget hotels & PGs',
    features: [
      'Core Guest & Staff Tools',
      'Instant Upsells & Minibar Orders',
      'Unlimited Staff/Owner Logins',
      'Basic Dashboard & Analytics',
    ],
    cta: 'Book a Demo',
  },
  {
    name: 'Growth Kit',
    price: '₹4,999 / month',
    value: 'The Profit & Brand Engine',
    target: '30-80 room 3-star hotels',
    features: [
      'Everything in Launchpad Kit',
      'Custom Branding',
      'Advanced Reports',
      'AI Insights',
    ],
    cta: 'Book a Demo',
    highlight: true,
  },
  {
    name: 'Intelligence OS',
    price: '₹19,999+ / month',
    value: 'The Full Autopilot System',
    target: '80+ room 4-star & luxury hotels',
    features: [
      'Everything in Growth Kit',
      'AI Bundling',
      'Zen-Sync Lite',
      'PMS Integrations',
      'Dedicated Manager',
    ],
    cta: 'Book a Demo',
  },
];

// Matrix for comparison at bottom
const featureMatrix = [
  { name: 'Guest & Staff Tools', tiers: [true, true, true] },
  { name: 'Instant Upsells / Minibar', tiers: [true, true, true] },
  { name: 'Unlimited Logins', tiers: [true, true, true] },
  { name: 'Analytics & Dashboard', tiers: [true, true, true] },
  { name: 'Custom Branding', tiers: [false, true, true] },
  { name: 'Advanced Reports', tiers: [false, true, true] },
  { name: 'AI Insights & Bundling', tiers: [false, false, true] },
  { name: 'Zen-Sync Lite', tiers: [false, false, true] },
  { name: 'PMS Integrations', tiers: [false, false, true] },
  { name: 'Dedicated Manager', tiers: [false, false, true] },
];

function Check({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <span className="text-[#6C63FF] font-extrabold text-lg">&#10003;</span>
  ) : (
    <span className="text-gray-300 font-extrabold text-lg">&#10007;</span>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-16 px-4 sm:px-8">
      <section className="mx-auto max-w-4xl text-center mb-10">
        <h1 className={`text-4xl font-extrabold mb-2 ${TEXT_PURPLE}`}>Zen-Guests Pricing</h1>
        <p className="text-lg text-gray-700 mb-7">Transparent plans for every independent hotel.<br />Outcomes, not features, with zero risk.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`
              flex flex-col rounded-2xl border px-7 py-10 bg-white
              shadow-md transition relative
              ${tier.highlight ? 'border-[#6C63FF] shadow-xl scale-105 ring-2 ring-[#6C63FF]' : 'border-gray-200'}
              hover:shadow-2xl hover:border-[#6C63FF]
            `}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{tier.name}</h2>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-[#6C63FF]">{tier.price}</span>
              <span className="bg-[#EEEBFF] text-[#5B50FA] px-3 py-1 rounded-2xl text-xs font-bold">{tier.value}</span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{tier.target}</p>
            <ul className="mb-8 flex-1 space-y-3 text-left text-base">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check enabled />
                  <span className="font-medium text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className={`w-full rounded-xl font-semibold mt-3 transition shadow ${PRIMARY_PURPLE} text-white ${HOVER_PURPLE}`}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="max-w-6xl mx-auto bg-[#FAFAFC] rounded-2xl shadow border border-gray-200 px-6 py-8 mb-10 overflow-x-auto">
        <h2 className={`text-xl font-bold mb-4 text-center ${TEXT_PURPLE}`}>Compare All Features</h2>
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 font-bold text-gray-700 text-base">Feature</th>
              {pricingTiers.map((tier) => (
                <th key={tier.name} className={`py-2 px-4 font-bold text-base text-center ${tier.highlight ? TEXT_PURPLE : 'text-gray-700'}`}>{tier.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((feat) => (
              <tr key={feat.name} className="border-b hover:bg-[#F0F0FF]">
                <td className="py-3 px-4 text-gray-600 font-medium">{feat.name}</td>
                {feat.tiers.map((has, idx) => (
                  <td key={idx} className="py-3 px-4 text-center">
                    <Check enabled={has} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center text-md text-gray-500">
        Need a custom solution?{' '}
        <a href="/contact" className="text-[#6C63FF] underline hover:text-[#3225a5] font-medium">Contact our team</a>
      </div>
    </main>
  );
}
