'use client'

import Image from "next/image"
import { use, useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createTaskDirect } from "@/app/actions/createTask"

interface UpsellDeal {
  id: string
  name: string
  price: number
  description: string | null
  imageUrl: string | null
  type: string | null
  active: boolean
}

interface PageProps {
  params: Promise<{
    hotelId: string
  }>
}

export default function GuestPortalPage({ params }: PageProps) {
  // Unwrap async params (Next.js 15 requirement)
  const { hotelId } = use(params)

  const [deals, setDeals] = useState<UpsellDeal[]>([])
  const [loading, setLoading] = useState(true)
  const [hotelName, setHotelName] = useState('Loading...')

  // Fetch deals for this hotel
  useEffect(() => {
    async function fetchDeals() {
      try {
        setLoading(true)
        const res = await fetch(`/api/hotels/${hotelId}/deals`, { cache: 'no-store' })
        
        if (!res.ok) {
          console.error('Failed to fetch deals:', res.status)
          setDeals([])
          return
        }

        const data = await res.json()
        setDeals(data)

        // Set hotel name based on hotelId (will fetch from API in production)
        if (hotelId === 'demo-hotel-123') {
          setHotelName('The Grand Mumbai')
        } else {
          setHotelName('Your Hotel')
        }
      } catch (error) {
        console.error('Error fetching deals:', error)
        setDeals([])
      } finally {
        setLoading(false)
      }
    }

    void fetchDeals()
  }, [hotelId])

  const handleClick = async (title: string) => {
    try {
      await createTaskDirect(title, '204', hotelId)
      alert('✓ Request sent! Check the hotel dashboard.')
    } catch (e) {
      console.error(e)
      alert('Unable to send request. Please try again.')
    }
  }

  // Group deals by type
  const upsellDeals = deals.filter(d => d.type === 'ROOM_UPGRADE' || d.type === 'EXPERIENCE')
  const foodDeals = deals.filter(d => d.type === 'FOOD_BEVERAGE')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, Priya! 👋</h1>
              <p className="text-gray-600 mt-1">{hotelName} • Room 204 • Check-out: Tomorrow 12 PM</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Premium Guest
            </Badge>
          </div>
        </div>
      </div>

      {/* Essential Info Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8.82a15 15 0 0 1 20 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 13a10 10 0 0 1 14 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 16.5a5 5 0 0 1 7 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span><strong>WiFi:</strong> GrandMumbai_Guest</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                </svg>
                <span><strong>Password:</strong> Guest12345</span>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-600 active:bg-green-700 transition-colors"
              aria-label="Message Front Desk on WhatsApp"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true" fill="currentColor">
                <path d="M19.11 17.56c-.29-.15-1.7-.84-1.96-.93-.26-.09-.45-.14-.62.14-.18.29-.69.93-.85 1.12-.16.19-.31.2-.57.07-.29-.15-1.12-.41-2.13-1.27-.79-.67-1.33-1.5-1.48-1.74-.16-.25-.02-.4.12-.56.13-.13.29-.32.43-.48.14-.17.19-.28.28-.46.1-.19.05-.34-.02-.49-.08-.15-.6-1.36-.82-1.86-.22-.49-.42-.43-.58-.44-.15-.01-.32-.01-.49-.01-.17 0-.45.07-.69.32-.24.26-.91.88-.91 2.16 0 1.27.93 2.5 1.06 2.66.13.17 1.84 2.8 4.46 3.92.62.26 1.11.43 1.49.55.62.2 1.2.17 1.64.1.5-.08 1.54-.63 1.76-1.23.22-.6.22-1.12.15-1.23-.07-.11-.24-.17-.5-.3zM26.03 6.01C23.32 3.3 19.84 2 16.18 2 8.86 2 3 7.86 3 15.17c0 2.6.68 5.1 1.98 7.31L3 30l7.67-1.99c2.15 1.18 4.58 1.8 7.08 1.8h.01c7.31 0 13.24-5.86 13.24-13.17 0-3.53-1.39-6.85-3.97-9.34z" />
              </svg>
              <span>Message Front Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Tabs defaultValue="enhance-stay" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-12">
            <TabsTrigger value="enhance-stay" className="text-sm font-medium">✨ Enhance Your Stay</TabsTrigger>
            <TabsTrigger value="local-essentials" className="text-sm font-medium">🏪 Local Essentials</TabsTrigger>
            <TabsTrigger value="room-requests" className="text-sm font-medium">🛎️ Room Requests</TabsTrigger>
          </TabsList>

          {/* Enhance Your Stay */}
          <TabsContent value="enhance-stay" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Enhance Your Stay</h2>
              <p className="text-gray-600">Exclusive offers curated just for you</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading exclusive offers...</p>
              </div>
            ) : upsellDeals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No offers available at the moment</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upsellDeals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {deal.imageUrl && (
                      <div className="relative h-48">
                        <Image 
                          src={deal.imageUrl} 
                          alt={deal.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                          className="object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        {deal.name}
                      </CardTitle>
                      <CardDescription>{deal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-green-600">
                            ₹{Number(deal.price).toLocaleString()}
                          </span>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Upgrade Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Local Essentials */}
          <TabsContent value="local-essentials" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Local Essentials</h2>
              <p className="text-gray-600">Mumbai's finest, delivered by our hotel staff</p>
              <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-800">🚀 Our Unique Advantage</Badge>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading local services...</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {foodDeals.length > 0 ? (
                  foodDeals.map((deal) => (
                    <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          🍽️ {deal.name}
                        </CardTitle>
                        <CardDescription>{deal.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-green-600">
                            ₹{Number(deal.price).toLocaleString()}
                          </span>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Order Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500">No local services available at the moment</p>
                  </div>
                )}

                {/* Default local services */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">💊 24/7 Pharmacy</CardTitle>
                    <CardDescription>Medicines and health essentials from trusted pharmacies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Order Medicine</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">👔 Premium Laundry</CardTitle>
                    <CardDescription>Express cleaning and pressing service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Schedule Pickup</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Room Requests */}
          <TabsContent value="room-requests" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Room Requests</h2>
              <p className="text-gray-600">Request anything you need, instantly</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">🏩</div>
                  <h3 className="font-semibold">Extra Towels</h3>
                  <p className="text-sm text-gray-600 mt-1">Fresh towels delivered</p>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-sm" 
                    onClick={() => handleClick('Extra Towels Request')}
                  >
                    Request Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">💧</div>
                  <h3 className="font-semibold">Water Bottles</h3>
                  <p className="text-sm text-gray-600 mt-1">Complimentary water</p>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-sm" 
                    onClick={() => handleClick('Deliver 2x Water Bottles')}
                  >
                    Request Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">🧺</div>
                  <h3 className="font-semibold">Laundry Pickup</h3>
                  <p className="text-sm text-gray-600 mt-1">Schedule collection</p>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-sm" 
                    onClick={() => handleClick('Laundry Pickup')}
                  >
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">🧖‍♀️</div>
                  <h3 className="font-semibold">Spa Booking</h3>
                  <p className="text-sm text-gray-600 mt-1">Relaxation awaits</p>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-sm" 
                    onClick={() => handleClick('Spa Booking Enquiry')}
                  >
                    Book Session
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
