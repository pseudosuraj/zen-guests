import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import SettingsClient from "./SettingsClient"

export default async function HotelSettingsPage() {
  const hotelId = "demo-hotel-123"
  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId }
  })

  if (!hotel) {
    return <div>Hotel not found</div>
  }

  async function updateHotel(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const wifiName = formData.get("wifiName") as string
    const wifiPassword = formData.get("wifiPassword") as string

    await prisma.hotel.update({
      where: { id: hotelId },
      data: { name, wifiName, wifiPassword }
    })

    revalidatePath("/owner/settings/hotel")
    revalidatePath("/guest/[hotelId]")
    revalidatePath("/api/hotels/[hotelId]/info")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SettingsClient hotel={hotel} updateAction={updateHotel} />
    </div>
  )
}
