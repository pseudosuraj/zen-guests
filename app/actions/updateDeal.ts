// app/actions/updateDeal.ts
"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function updateDeal(formData: FormData) {
  const dealId = formData.get("dealId") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number(formData.get("price"))
  const imageUrl = formData.get("imageUrl") as string
  const type = formData.get("type") as string

  if (!dealId) throw new Error("Missing dealId")

  await prisma.upsellDeal.update({
    where: { id: dealId },
    data: {
      name,
      description,
      price,
      imageUrl,
      type,
    }
  })

  revalidatePath("/owner/deals")
  return { success: true }
}
