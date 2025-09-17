import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Zen-Guests | Hotel Upselling & Guest Service Platform",
  description: "WhatsApp-native upselling and guest-service platform for Indian hospitality industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
