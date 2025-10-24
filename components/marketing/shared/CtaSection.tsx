'use client'
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-7">
          Ready to Join the Future of Indian Hospitality?
        </h2>
        <Button
          asChild
          className="bg-accent-green text-white text-lg font-bold px-8 py-4 rounded-lg hover:bg-accent-green/90 transition"
        >
          <a href="/book-a-demo">Book a Live Demo</a>
        </Button>
      </div>
    </section>
  )
}
