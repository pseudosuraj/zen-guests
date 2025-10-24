'use client'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="q1">
            <AccordionTrigger className="font-semibold text-lg text-primary">
              Is there a long-term contract?
            </AccordionTrigger>
            <AccordionContent className="text-primary/80">
              No. All our plans are month-to-month. You can upgrade, downgrade, or cancel anytime.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger className="font-semibold text-lg text-primary">
              What kind of support is included?
            </AccordionTrigger>
            <AccordionContent className="text-primary/80">
              All plans include email and in-app chat support. Our Intelligence OS plan includes a dedicated account manager.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger className="font-semibold text-lg text-primary">
              How long does it take to get set up?
            </AccordionTrigger>
            <AccordionContent className="text-primary/80">
              Setup is incredibly fast. Since we don't require complex PMS integration for our pilot program, you can be up and running in as little as one business day.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
