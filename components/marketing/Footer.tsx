import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import Logo from "@/components/marketing/Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main content area */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left: Brand section with FIXED HEIGHT container (like navbar) */}
          <div className="md:col-span-5">
            {/* Fixed-height logo container - EXACTLY like Navbar */}
            <div className="h-20 flex items-center mb-6">
              <div style={{ filter: "brightness(0) invert(1)" }}>
                <Logo />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Transforming Indian hospitality—simpler, calmer, and far more profitable.
            </p>
          </div>

          {/* Right: Links section */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-3 gap-8">
              {/* Product */}
              <div>
                <div className="font-bold text-lg text-white mb-4">Product</div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/products" className="text-gray-400 hover:text-purple-400 transition">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-gray-400 hover:text-purple-400 transition">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/book-a-demo" className="text-gray-400 hover:text-purple-400 transition">
                      Book a Demo
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <div className="font-bold text-lg text-white mb-4">Company</div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about-us" className="text-gray-400 hover:text-purple-400 transition">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-purple-400 transition">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <div className="font-bold text-lg text-white mb-4">Social</div>
                <div className="flex gap-4">
                  <Link 
                    href="https://linkedin.com" 
                    target="_blank"
                    aria-label="LinkedIn" 
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    <Linkedin size={24} />
                  </Link>
                  <Link 
                    href="https://twitter.com" 
                    target="_blank"
                    aria-label="Twitter" 
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    <Twitter size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      

      {/* Sub-footer */}
      <div className="border-t border-slate-700 py-6 text-center text-sm text-gray-500">
        © 2025 Zen-Guests. All rights reserved.
      </div>
    </footer>
  );
}
