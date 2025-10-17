"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type CreateDealInput = {
  hotelId: string
  title: string
  description: string
  price: number
}

type UpdateDealInput = {
  title: string
  description: string
  price: number
}

export async function createDeal(data: CreateDealInput) {
  try {
    const deal = await prisma.deal.create({
      data: {
        hotelId: data.hotelId,
        title: data.title,
        description: data.description,
        price: data.price,
      }
    })
    
    revalidatePath("/owner/deals")
    return deal
  } catch (error) {
    console.error("Error creating deal:", error)
    throw new Error("Failed to create deal")
  }
}

export async function updateDeal(id: string, data: UpdateDealInput) {
  try {
    const deal = await prisma.deal.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
      }
    })
    
    revalidatePath("/owner/deals")
    return deal
  } catch (error) {
    console.error("Error updating deal:", error)
    throw new Error("Failed to update deal")
  }
}

export async function deleteDeal(id: string) {
  try {
    await prisma.deal.delete({
      where: { id }
    })
    
    revalidatePath("/owner/deals")
    return { success: true }
  } catch (error) {
    console.error("Error deleting deal:", error)
    throw new Error("Failed to delete deal")
  }
}
