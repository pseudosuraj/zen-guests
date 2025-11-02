import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Zen-Guests Platform</h1>
        <p className="mb-8 text-lg text-gray-600">
          Experience how Indian hotels delight guests and grow revenue.
        </p>
        <div className="flex gap-6">
          <a href="/owner/login" className="rounded-lg px-6 py-3 bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">
            Hotel Dashboard Login
          </a>
          <a href="/qr-welcome" className="rounded-lg px-6 py-3 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Guest Portal Demo
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
