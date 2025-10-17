"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function deleteDeal(formData: FormData) {
  const dealId = formData.get("dealId") as string
  if (!dealId) throw new Error("Missing dealId")

  await prisma.upsellDeal.delete({ where: { id: dealId } })
  revalidatePath("/owner/deals")
  return { success: true }
}
