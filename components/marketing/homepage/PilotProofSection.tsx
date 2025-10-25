'use client'

export default function PilotProofSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
          Be the First to Experience the Future.
        </h2>
        <p className="text-lg text-primary/80 mb-8 leading-relaxed">
          Our pilot program is now open. The feedback and results from our founding partners will be featured here soon. Join us to become an industry innovator.
        </p>
        {/* Visual placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-slate-100 rounded-xl h-48 flex items-center justify-center border border-slate-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 opacity-60 blur-md"></div>
              <span className="relative text-slate-400 font-semibold text-lg">Coming Soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
