// components/marketing/homepage/TestimonialSection.tsx
'use client'

export default function TestimonialSection() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-primary mb-8">
          The Partner of Choice for Modern Indian Hoteliers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <svg className="mb-3 text-accent w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13c1 0 1.5-.5 2-1M13 11c.5-1 1.5-2 3-2m-2 6a4 4 0 00-4-4m8 8a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-primary/75 text-lg italic text-center mb-5">
              “Zen-Guests transformed our operations. Our ancillary revenue is up 27% and our guests are happier than ever.”
            </p>
            <div className="mt-4">
              <span className="font-bold text-accent text-lg">Prakash Reddy</span>
              <div className="text-sm text-primary/70">General Manager, The Ruby Hotel, Hyderabad</div>
            </div>
          </div>
          {/* Testimonial Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <svg className="mb-3 text-accent w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13c1 0 1.5-.5 2-1M13 11c.5-1 1.5-2 3-2m-2 6a4 4 0 00-4-4m8 8a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-primary/75 text-lg italic text-center mb-5">
              “No more guesswork. The insights Zen-Guests provides are actionable and tailored to Indian hotels.”
            </p>
            <div className="mt-4">
              <span className="font-bold text-accent text-lg">Aarti Malhotra</span>
              <div className="text-sm text-primary/70">Owner, Green Lotus Residency, Bengaluru</div>
            </div>
          </div>
          {/* Testimonial Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <svg className="mb-3 text-accent w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13c1 0 1.5-.5 2-1M13 11c.5-1 1.5-2 3-2m-2 6a4 4 0 00-4-4m8 8a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-primary/75 text-lg italic text-center mb-5">
              “Setup was seamless. Staff adoption took just 2 days and they love using Zen-Guests every shift.”
            </p>
            <div className="mt-4">
              <span className="font-bold text-accent text-lg">Ramesh Kumar</span>
              <div className="text-sm text-primary/70">Director, Pearl Palace, Chennai</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
