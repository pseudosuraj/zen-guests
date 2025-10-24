'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

const plans = [
  {
    name: "Launchpad Kit",
    price: "₹499 / month",
    target: "Perfect for 10-30 room small hotels",
    highlighted: false,
    features: [
      "Digital guest portal and in-room upsell menu",
      "Minibar and retail management",
      "Unlimited staff/owner logins",
      "Basic reporting dashboard",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    name: "Growth Kit",
    price: "₹1499 / month",
    target: "Perfect for 30-75 room hotels",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Everything in Launchpad Kit",
      "WhatsApp-native guest booking flow*",
      "Branded WhatsApp notifications",
      "Smart assignment & task automation",
      "Full reporting & analytics",
    ],
    buttonText: "Choose Plan",
    buttonVariant: "solid",
  },
  {
    name: "Intelligence OS",
    price: "₹4499 / month",
    target: "For large hotels & ambitious brands",
    highlighted: false,
    features: [
      "Everything in Growth Kit",
      "Dedicated account manager",
      "Custom integrations (PMS, POS, CRM)",
      "Multi-property management",
    ],
    buttonText: "Talk to Sales",
    buttonVariant: "outline",
  }
];

export default function PricingTiers() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between h-full ${
                plan.highlighted
                  ? 'border-2 border-accent-green shadow-lg relative'
                  : ''
              }`}
            >
              <CardHeader className="text-center pb-2">
                {plan.highlighted && (
                  <span className="absolute left-1/2 -top-4 transform -translate-x-1/2 px-3 py-1 rounded-full bg-accent-green text-white text-xs font-bold shadow">Most Popular</span>
                )}
                <CardTitle className="font-bold text-2xl text-primary mb-2">{plan.name}</CardTitle>
                <span className="text-3xl font-extrabold text-primary">{plan.price}</span>
                <div className="text-primary/70 text-sm mt-2">{plan.target}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left mt-5 mb-6">
                  {plan.features.map((feature) => (
                    <li className="flex items-center gap-2 text-primary" key={feature}>
                      <CheckCircle2 className="text-accent-green w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Button
                    className={
                      plan.highlighted
                        ? "w-full bg-accent-green text-white font-bold hover:bg-accent-green/90"
                        : "w-full border border-accent-green text-accent-green font-bold bg-white hover:bg-accent-green/10"
                    }
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center text-primary/80 text-base">
          <em>
            *All plans include a small performance commission on the new revenue you generate. This ensures we only win when you win.
          </em>
        </div>
      </div>
    </section>
  );
}
