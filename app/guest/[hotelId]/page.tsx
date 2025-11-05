'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createTaskDirect } from "@/app/actions/createTask";
import { purchaseUpsell } from "@/app/actions/purchaseUpsell";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface UpsellDeal {
  id: string;
  name: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  type: string | null;
  active: boolean;
}

interface RegularDeal {
  id: string;
  title: string;
  description: string | null;
  price: number;
}

interface MinibarItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
  stockQuantity?: number;
}

export default function GuestPortalPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;

  const [deals, setDeals] = useState<UpsellDeal[]>([]);
  const [regularDeals, setRegularDeals] = useState<RegularDeal[]>([]);
  const [minibarItems, setMinibarItems] = useState<MinibarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hotelName, setHotelName] = useState('Loading...');
  const [purchasingDealId, setPurchasingDealId] = useState<string | null>(null);

  const [medicineRequest, setMedicineRequest] = useState('');
  const [laundryDetails, setLaundryDetails] = useState('');
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [showLaundryForm, setShowLaundryForm] = useState(false);
  const [showMenuOrderForm, setShowMenuOrderForm] = useState(false);
  const [menuOrder, setMenuOrder] = useState('');

  const [minibarCart, setMinibarCart] = useState<Record<string, number>>({});

  const GUEST_NAME = 'Priya Sharma';
  const ROOM_NUMBER = '204';
  const [wifiInfo, setWifiInfo] = useState({ name: 'Loading...', password: '****' });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const dealsRes = await fetch(`/api/hotels/${hotelId}/deals`, { cache: 'no-store' });
        setDeals(dealsRes.ok ? await dealsRes.json() : []);

        const hotelRes = await fetch(`/api/hotels/${hotelId}/info`, { cache: 'no-store' });
        if (hotelRes.ok) {
          const hotelData = await hotelRes.json();
          setHotelName(hotelData.name || 'Your Hotel');
          setWifiInfo({
            name: hotelData.wifiName || 'Hotel WiFi',
            password: hotelData.wifiPassword || 'Ask Front Desk'
          });
        }

        const regularDealsRes = await fetch(`/api/hotels/${hotelId}/regular-deals`, { cache: 'no-store' });
        setRegularDeals(regularDealsRes.ok ? await regularDealsRes.json() : []);

        const minibarRes = await fetch(`/api/hotels/${hotelId}/minibar`, { cache: 'no-store' });
        setMinibarItems(minibarRes.ok ? await minibarRes.json() : []);

        if (hotelId === 'demo-hotel-123') {
          setHotelName('The Grand Mumbai');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [hotelId]);

  const handleRoomRequest = async (title: string) => {
    try {
      await createTaskDirect(title, ROOM_NUMBER, hotelId)
      alert('✓ Request sent! Our staff will assist you shortly.')
    } catch (e) {
      console.error(e)
      alert('Unable to send request. Please try again.')
    }
  }

  const handlePurchase = async (deal: UpsellDeal) => {
    try {
      setPurchasingDealId(deal.id)
      
      await purchaseUpsell({
        dealName: deal.name,
        dealPrice: Number(deal.price),
        hotelId: hotelId,
        roomNumber: ROOM_NUMBER,
        guestName: GUEST_NAME,
      })

      alert(`✓ Purchase confirmed!\n\n${deal.name} - ₹${deal.price}\n\nOur staff will fulfill your request shortly.`)
    } catch (error) {
      console.error('❌ Purchase failed:', error)
      alert(`Purchase failed: ${error instanceof Error ? error.message : 'Please try again.'}`)
    } finally {
      setPurchasingDealId(null)
    }
  }

  const handleRegularDealPurchase = async (deal: RegularDeal) => {
    try {
      const res = await fetch("/api/guest/buy-deal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId: deal.id,
          hotelId: hotelId,
          roomNumber: ROOM_NUMBER,
          guestName: GUEST_NAME,
        }),
      })
      if (res.ok) {
        alert(`✓ Request sent!\n\n${deal.title} - ₹${deal.price}\n\nOur staff will fulfill your request and message you in chat.`)
      } else {
        alert("Sorry, your request could not be sent.")
      }
    } catch (error) {
      console.error(error)
      alert("Error sending request. Please try again.")
    }
  }

  const handleMedicineRequest = async () => {
    if (!medicineRequest.trim()) {
      alert('Please describe what medicines you need.')
      return
    }

    try {
      await createTaskDirect(`Medicine Request: ${medicineRequest}`, ROOM_NUMBER, hotelId)
      alert('✓ Medicine request sent! Our staff will respond shortly.')
      setMedicineRequest('')
      setShowMedicineForm(false)
    } catch (error) {
      console.error(error)
      alert('Unable to send request. Please try again.')
    }
  }

  const handleLaundryRequest = async () => {
    if (!laundryDetails.trim()) {
      alert('Please provide details about your laundry.')
      return
    }

    try {
      await createTaskDirect(`Laundry Pickup: ${laundryDetails}`, ROOM_NUMBER, hotelId)
      alert('✓ Laundry pickup scheduled! Our staff will collect your items shortly.')
      setLaundryDetails('')
      setShowLaundryForm(false)
    } catch (error) {
      console.error(error)
      alert('Unable to schedule pickup. Please try again.')
    }
  }

  const handleMenuOrder = async () => {
    if (!menuOrder.trim()) {
      alert('Please enter your order details.')
      return
    }

    try {
      await createTaskDirect(`Room Service Order: ${menuOrder}`, ROOM_NUMBER, hotelId)
      alert('✓ Order placed!\n\nOur staff will confirm your order shortly.\n\n💳 Payment: Add to room bill or payment link will be sent.')
      setMenuOrder('')
      setShowMenuOrderForm(false)
    } catch (error) {
      console.error(error)
      alert('Unable to place order. Please try again.')
    }
  }

  const updateMinibarQuantity = (itemId: string, change: number) => {
    setMinibarCart(prev => {
      const current = prev[itemId] || 0
      const newQuantity = Math.max(0, current + change)
      if (newQuantity === 0) {
        const { [itemId]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: newQuantity }
    })
  }

  const addMinibarToOrder = async (item: MinibarItem) => {
    const quantity = minibarCart[item.id] || 0
    
    if (quantity === 0) {
      alert('Please select quantity first')
      return
    }

    const totalPrice = item.price * quantity

    try {
      await createTaskDirect(
        `Minibar Order: ${quantity}x ${item.name} - ₹${totalPrice}`,
        ROOM_NUMBER,
        hotelId
      )
      alert(`✓ Added to order!\n\n${quantity}x ${item.name}\nTotal: ₹${totalPrice}\n\nWill be delivered shortly!`)
      setMinibarCart(prev => {
        const { [item.id]: _, ...rest } = prev
        return rest
      })
    } catch (error) {
      console.error(error)
      alert('Unable to place order. Please try again.')
    }
  }

  const upsellDeals = deals.filter(d => d.type === 'ROOM_UPGRADE' || d.type === 'EXPERIENCE')

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Welcome back, {GUEST_NAME}! 👋
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {hotelName} • Room {ROOM_NUMBER} • Check-out: Tomorrow 12 PM
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 w-fit">
              Premium Guest
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs md:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 8.82a15 15 0 0 1 20 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 13a10 10 0 0 1 14 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 16.5a5 5 0 0 1 7 0" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span><strong>WiFi:</strong> {wifiInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                </svg>
                <span><strong>Password:</strong> {wifiInfo.password}</span>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-600 transition-colors text-xs md:text-sm"
            >
              <svg viewBox="0 0 32 32" className="w-4 h-4 md:w-5 md:h-5" fill="currentColor">
                <path d="M19.11 17.56c-.29-.15-1.7-.84-1.96-.93-.26-.09-.45-.14-.62.14-.18.29-.69.93-.85 1.12-.16.19-.31.2-.57.07-.29-.15-1.12-.41-2.13-1.27-.79-.67-1.33-1.5-1.48-1.74-.16-.25-.02-.4.12-.56.13-.13.29-.32.43-.48.14-.17.19-.28.28-.46.1-.19.05-.34-.02-.49-.08-.15-.6-1.36-.82-1.86-.22-.49-.42-.43-.58-.44-.15-.01-.32-.01-.49-.01-.17 0-.45.07-.69.32-.24.26-.91.88-.91 2.16 0 1.27.93 2.5 1.06 2.66.13.17 1.84 2.8 4.46 3.92.62.26 1.11.43 1.49.55.62.2 1.2.17 1.64.1.5-.08 1.54-.63 1.76-1.23.22-.6.22-1.12.15-1.23-.07-.11-.24-.17-.5-.3zM26.03 6.01C23.32 3.3 19.84 2 16.18 2 8.86 2 3 7.86 3 15.17c0 2.6.68 5.1 1.98 7.31L3 30l7.67-1.99c2.15 1.18 4.58 1.8 7.08 1.8h.01c7.31 0 13.24-5.86 13.24-13.17 0-3.53-1.39-6.85-3.97-9.34z" />
              </svg>
              <span>Message Zen-Assist</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <Tabs defaultValue="enhance-stay" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8 h-auto md:h-12 gap-1">
            <TabsTrigger 
              value="enhance-stay" 
              className="text-xs md:text-sm font-medium py-3 md:py-2 px-1 md:px-3"
            >
              <span className="hidden md:inline">✨ Enhance Your Stay</span>
              <span className="md:hidden">✨ Upgrades</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dining" 
              className="text-xs md:text-sm font-medium py-3 md:py-2 px-1 md:px-3"
            >
              <span className="hidden md:inline">🍽️ Dining & Minibar</span>
              <span className="md:hidden">🍽️ Food</span>
            </TabsTrigger>
            <TabsTrigger 
              value="room-requests" 
              className="text-xs md:text-sm font-medium py-3 md:py-2 px-1 md:px-3"
            >
              <span className="hidden md:inline">🛎️ Room Services</span>
              <span className="md:hidden">🛎️ Services</span>
            </TabsTrigger>
          </TabsList>

          {/* Enhance Your Stay */}
          <TabsContent value="enhance-stay" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Enhance Your Stay</h2>
              <p className="text-sm md:text-base text-gray-600">Exclusive offers curated just for you</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading exclusive offers...</p>
              </div>
            ) : (
              <>
                {/* UpsellDeals (Room Upgrades, Experiences) */}
                {upsellDeals.length > 0 && (
                  <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {upsellDeals.map((deal) => (
                      <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        {deal.imageUrl && (
                          <div className="relative h-40 md:h-48">
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
                        <CardHeader className="p-4">
                          <CardTitle className="text-base md:text-lg">{deal.name}</CardTitle>
                          <CardDescription className="text-sm">{deal.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xl md:text-2xl font-bold text-green-600">
                              ₹{Number(deal.price).toLocaleString()}
                            </span>
                            <Button 
                              className="bg-purple-600 hover:bg-purple-700 text-sm"
                              onClick={() => handlePurchase(deal)}
                              disabled={purchasingDealId === deal.id}
                            >
                              {purchasingDealId === deal.id ? 'Processing...' : 'Purchase Now'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Regular Deals (from Deal Manager) */}
                {regularDeals.length > 0 && (
                  <div className={upsellDeals.length > 0 ? "mt-8" : ""}>
                    {upsellDeals.length > 0 && (
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Special Deals & Offers</h3>
                    )}
                    <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {regularDeals.map((deal) => (
                        <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <CardHeader className="p-4">
                            <CardTitle className="text-base md:text-lg">{deal.title}</CardTitle>
                            <CardDescription className="text-sm">{deal.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xl md:text-2xl font-bold text-green-600">
                                ₹{Number(deal.price).toLocaleString()}
                              </span>
                              <Button 
                                className="bg-purple-600 hover:bg-purple-700 text-sm"
                                onClick={() => handleRegularDealPurchase(deal)}
                              >
                                Get This Deal
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {upsellDeals.length === 0 && regularDeals.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No offers available at the moment</p>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Dining & Minibar */}
          <TabsContent value="dining" className="space-y-6">
            {/* Digital Minibar - Compact Version */}
            <div>
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  🛒 Digital Minibar
                </h2>
                <p className="text-sm text-gray-600">
                  • Instant delivery • Instant Happiness 
                </p>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                </div>
              ) : minibarItems.length > 0 ? (
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {minibarItems.map((item) => {
                    const quantity = minibarCart[item.id] || 0
                    return (
                      <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-center h-16 text-3xl mb-2">
                            {item.category === 'Beverages' ? '🥤' : '🍿'}
                          </div>
                          <h3 className="font-semibold text-sm mb-1 text-center">{item.name}</h3>
                          <p className="text-lg font-bold text-green-600 mb-2 text-center">
                            ₹{item.price}
                          </p>
                          
                          {item.isAvailable ? (
                            <>
                              <div className="flex items-center justify-center gap-2 mb-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={() => updateMinibarQuantity(item.id, -1)}
                                  disabled={quantity === 0}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 w-7 p-0"
                                  onClick={() => updateMinibarQuantity(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <Button
                                className="w-full bg-purple-600 hover:bg-purple-700 text-xs h-8"
                                onClick={() => addMinibarToOrder(item)}
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                            </>
                          ) : (
                            <Badge variant="secondary" className="w-full justify-center text-xs">Out of Stock</Badge>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Minibar items will appear here</p>
                </div>
              )}
            </div>

            {/* Room Service Menu */}
            <div className="pt-4 border-t">
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  🍽️ Room Service Menu
                </h2>
                <p className="text-sm text-gray-600">
                  Order from our complete menu
                </p>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-center text-gray-500 mb-2 text-sm">
                      📄 View Complete Menu
                    </div>
                    <div className="aspect-[3/4] max-h-64 bg-white rounded flex items-center justify-center text-5xl">
                      🍽️
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Tap to view full menu
                    </p>
                  </div>

                  {!showMenuOrderForm ? (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowMenuOrderForm(true)}
                    >
                      📝 Place Order from Menu
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Textarea
                        placeholder={"What would you like to order?\n\nExample:\n1x Butter Chicken\n2x Masala Dosa\n1x Cold Coffee\n\nAny special instructions?"}
                        value={menuOrder}
                        onChange={(e) => setMenuOrder(e.target.value)}
                        className="text-sm"
                        rows={5}
                      />
                      <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900">
                        💳 <strong>Payment:</strong> Add to room bill or payment link will be sent
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={handleMenuOrder}
                        >
                          Place Order
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setShowMenuOrderForm(false)
                            setMenuOrder('')
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Room Services */}
          <TabsContent value="room-requests" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Room Services</h2>
              <p className="text-sm md:text-base text-gray-600">Request anything you need</p>
            </div>

            {/* Essential Room Services */}
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 p-3">
                  <div className="text-3xl mb-2">🏩</div>
                  <h3 className="font-semibold text-sm">Extra Towels</h3>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-xs h-8" 
                    onClick={() => handleRoomRequest('Extra Towels Request')}
                  >
                    Request
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 p-3">
                  <div className="text-3xl mb-2">💧</div>
                  <h3 className="font-semibold text-sm">Water Bottles</h3>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-xs h-8" 
                    onClick={() => handleRoomRequest('Deliver 2x Water Bottles')}
                  >
                    Request
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 p-3">
                  <div className="text-3xl mb-2">🧖‍♀️</div>
                  <h3 className="font-semibold text-sm">Spa Booking</h3>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-xs h-8" 
                    onClick={() => handleRoomRequest('Spa Booking Enquiry')}
                  >
                    Book
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-4 p-3">
                  <div className="text-3xl mb-2">🧹</div>
                  <h3 className="font-semibold text-sm">Housekeeping</h3>
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-xs h-8" 
                    onClick={() => handleRoomRequest('Housekeeping Request')}
                  >
                    Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Services */}
            <div className="grid gap-3 sm:grid-cols-2 pt-4">
              {/* Medicine */}
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    💊 Medicine Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {!showMedicineForm ? (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-sm"
                      onClick={() => setShowMedicineForm(true)}
                    >
                      Request Medicines
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="What medicines do you need?"
                        value={medicineRequest}
                        onChange={(e) => setMedicineRequest(e.target.value)}
                        className="text-sm"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={handleMedicineRequest}
                        >
                          Send
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowMedicineForm(false)
                            setMedicineRequest('')
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Laundry */}
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    👔 Laundry Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {!showLaundryForm ? (
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-sm"
                      onClick={() => setShowLaundryForm(true)}
                    >
                      Schedule Pickup
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="How many items?"
                        value={laundryDetails}
                        onChange={(e) => setLaundryDetails(e.target.value)}
                        className="text-sm"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                          onClick={handleLaundryRequest}
                        >
                          Schedule
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowLaundryForm(false)
                            setLaundryDetails('')
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}


