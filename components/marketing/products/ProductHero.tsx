export default function ProductHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-10 bg-background">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary text-center">
        The Complete OS for Your Hotel.
      </h1>
      <p className="text-xl md:text-2xl text-text-secondary mb-9 text-center max-w-2xl">
        Go beyond simple upselling. Zen-Guests is a single platform that unifies your revenue, operations, and guest experience into one beautiful, simple-to-use system.
      </p>
      {/* Replace with your own dashboard mockup! */}
      <img
        src="/mockups/dashboard.png"
        alt="Zen-Guests dashboard mockup"
        className="w-full max-w-3xl rounded-xl shadow-lg border border-card-bg"
        style={{ background: '#fff' }}
      />
    </section>
  );
}
