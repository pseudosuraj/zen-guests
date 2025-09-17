// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
        {/* Simple text logo */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-sm">
          <div className="h-2 w-2 rounded-full bg-purple-600" />
          <span className="text-sm font-medium tracking-wide text-gray-700">Zen-Guests</span>
        </div>

        {/* Headline */}
        <h1 className="bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Welcome to the Future of Hospitality
        </h1>
        <p className="mt-4 max-w-xl text-base text-gray-600">
          Upselling, guest service, and a calm back office—beautifully unified for modern Indian hotels.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          {/* Primary: Hotelier Portal */}
          <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
            <Link href="/owner/dashboard" prefetch>
              Enter Hotelier Portal
            </Link>
          </Button>

          {/* Secondary: Guest Demo */}
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/qr-welcome" prefetch>
              Launch Guest Demo
            </Link>
          </Button>
        </div>

        {/* Sub text */}
        <div className="mt-6 text-xs text-gray-500">
          Built with Next.js App Router and shadcn/ui for a fast, elegant demo experience.
        </div>
      </div>
    </main>
  );
}
