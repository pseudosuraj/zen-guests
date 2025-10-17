"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Hotel = {
  id: string
  name: string
  wifiName: string | null
  wifiPassword: string | null
}

export default function SettingsClient({ hotel, updateAction }: { 
  hotel: Hotel, 
  updateAction: (formData: FormData) => Promise<void> 
}) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await updateAction(formData)
      setMessage("✓ Settings saved successfully!")
      setTimeout(() => setMessage(""), 3000)
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotel Profile</h1>
        <p className="text-gray-600">
          Update your hotel information and guest WiFi details
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-in fade-in">
          {message}
        </div>
      )}

      <form action={handleSubmit}>
        {/* Hotel Name */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hotel Information</CardTitle>
            <CardDescription>Basic details about your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Hotel Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={hotel.name}
                placeholder="e.g. The Grand Mumbai"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* WiFi Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>📶 Guest WiFi Information</CardTitle>
            <CardDescription>
              This information will be displayed to guests in their portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="wifiName">WiFi Network Name</Label>
              <Input
                id="wifiName"
                name="wifiName"
                defaultValue={hotel.wifiName || ""}
                placeholder="e.g. GrandMumbai_Guest"
                required
              />
            </div>
            <div>
              <Label htmlFor="wifiPassword">WiFi Password</Label>
              <Input
                id="wifiPassword"
                name="wifiPassword"
                defaultValue={hotel.wifiPassword || ""}
                placeholder="e.g. Guest12345"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Hotel Settings"}
        </Button>
      </form>
    </div>
  )
}
