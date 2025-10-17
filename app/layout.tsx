import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zen-Guests | The AI Revenue OS for Indian Hotels",
  description: "Zen-Guests is the AI-powered OS for Indian hospitality. Stop the chaos, start the revenue.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50 min-h-screen flex flex-col"}>
        <Navbar />
        <main className="flex-1 w-full mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
