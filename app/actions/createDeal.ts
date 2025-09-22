// app/actions/createDeal.ts
'use server'

// Temporary no-DB stub; replace with Prisma version once schema is restored
type Deal = {
  id: string
  name: string
  price: number
  description?: string | null
  active: boolean
  createdAt: string
  updatedAt?: string
}

export async function createDeal(formData: FormData): Promise<Deal> {
  const name = String(formData.get('name') ?? '')
  const priceStr = String(formData.get('price') ?? '0')
  const description = String(formData.get('description') ?? '')
  const isActive = String(formData.get('active') ?? 'true') === 'true'

  if (!name.trim()) {
    throw new Error('Name is required')
  }
  const price = Number.parseFloat(priceStr)
  if (Number.isNaN(price)) {
    throw new Error('Price must be a number')
  }

  // Return a stub object; persist later with Prisma
  return {
    id: 'stub-' + Math.random().toString(36).slice(2),
    name,
    price,
    description: description || null,
    active: isActive,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
