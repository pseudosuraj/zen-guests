// prisma/seed-minibar.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedMinibar() {
  const DEMO_HOTEL_ID = 'demo-hotel-123'

  console.log('🏨 Checking if demo hotel exists...')

  // Create demo hotel if it doesn't exist
  const existingHotel = await prisma.hotel.findUnique({
    where: { id: DEMO_HOTEL_ID },
  })

  if (!existingHotel) {
    console.log('🏨 Creating demo hotel...')
    await prisma.hotel.create({
      data: {
        id: DEMO_HOTEL_ID,
        name: 'The Grand Mumbai',
        brandColor: '#7c3aed',
      },
    })
    console.log('✅ Demo hotel created!')
  } else {
    console.log('✅ Demo hotel already exists')
  }

  console.log('🛒 Seeding minibar items...')

  // Delete existing minibar items
  await prisma.minibarItem.deleteMany({
    where: { hotelId: DEMO_HOTEL_ID },
  })

  // Create sample minibar items
  const items = await prisma.minibarItem.createMany({
    data: [
      {
        name: 'Coca Cola',
        price: 50,
        category: 'Beverages',
        stockQuantity: 24,
        lowStockThreshold: 5,
        isAvailable: true,
        hotelId: DEMO_HOTEL_ID,
      },
      {
        name: 'Sprite',
        price: 50,
        category: 'Beverages',
        stockQuantity: 18,
        lowStockThreshold: 5,
        isAvailable: true,
        hotelId: DEMO_HOTEL_ID,
      },
      {
        name: 'Lays Classic',
        price: 30,
        category: 'Snacks',
        stockQuantity: 15,
        lowStockThreshold: 5,
        isAvailable: true,
        hotelId: DEMO_HOTEL_ID,
      },
      {
        name: 'Kurkure',
        price: 20,
        category: 'Snacks',
        stockQuantity: 12,
        lowStockThreshold: 5,
        isAvailable: true,
        hotelId: DEMO_HOTEL_ID,
      },
      {
        name: 'Bisleri 1L',
        price: 20,
        category: 'Beverages',
        stockQuantity: 30,
        lowStockThreshold: 10,
        isAvailable: true,
        hotelId: DEMO_HOTEL_ID,
      },
      {
        name: 'KitKat',
        price: 30,
        category: 'Snacks',
        stockQuantity: 3,
        lowStockThreshold: 5,
        isAvailable: true,
        hotelId: DEMO_HOTEL_ID,
      },
    ],
  })

  console.log(`✅ Created ${items.count} minibar items`)
}

seedMinibar()
  .then(() => {
    console.log('✅ Minibar seeding complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Minibar seeding failed:', error)
    process.exit(1)
  })
