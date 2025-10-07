// app/owner/settings/page.tsx
'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Building2, Bell, Shield, Palette, CreditCard, ArrowRight } from 'lucide-react'

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Staff Management',
      description: 'Add and manage staff members who can access the task portal',
      icon: Users,
      href: '/owner/settings/staff',
      badge: 'Active',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      title: 'Hotel Profile',
      description: 'Update your hotel name, contact details, and branding',
      icon: Building2,
      href: '/owner/settings/hotel',
      badge: null,
    },
    {
      title: 'Notifications',
      description: 'Configure email and WhatsApp notification preferences',
      icon: Bell,
      href: '/owner/settings/notifications',
      badge: 'Coming Soon',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Security & Access',
      description: 'Manage passwords, two-factor authentication, and API keys',
      icon: Shield,
      href: '/owner/settings/security',
      badge: 'Coming Soon',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Branding & Theme',
      description: 'Customize colors, logos, and guest portal appearance',
      icon: Palette,
      href: '/owner/settings/branding',
      badge: 'Coming Soon',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Billing & Subscription',
      description: 'View invoices, update payment method, and manage your plan',
      icon: CreditCard,
      href: '/owner/settings/billing',
      badge: 'Coming Soon',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your hotel, staff, and system preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {settingsSections.map((section) => {
            const Icon = section.icon
            const isComingSoon = section.badge === 'Coming Soon'

            return (
              <Card
                key={section.href}
                className={`hover:shadow-lg transition-shadow ${
                  isComingSoon ? 'opacity-75' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        {section.badge && (
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded ${
                              section.badgeColor || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {section.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isComingSoon ? (
                    <Button variant="outline" disabled className="w-full">
                      Coming Soon
                    </Button>
                  ) : (
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                      <Link href={section.href}>
                        Configure
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Help with Settings?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is available to help you configure your hotel for optimal performance.
          </p>
          <Button variant="outline">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
