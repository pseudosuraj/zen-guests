'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-card-bg border-t border-border-soft py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-display text-xl font-bold text-text-primary mb-3">
              Zen-Guests
            </h3>
            <p className="text-text-primary/70 text-sm leading-relaxed">
              Replace Chaos with Calm. Turn Stays into Revenue.
            </p>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/book-a-demo" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-primary/70 hover:text-accent-terracotta transition text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border-soft text-center">
          <p className="text-text-primary/70 text-sm">
            © {new Date().getFullYear()} Zen-Guests. Human-Centric Technology for Modern Hotels.
          </p>
        </div>
      </div>
    </footer>
  )
}
