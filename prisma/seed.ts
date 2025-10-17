import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create demo hotel
  const hotel = await prisma.hotel.upsert({
    where: { id: 'demo-hotel-123' },
    update: {},
    create: {
      id: 'demo-hotel-123',
      name: 'The Grand Mumbai',
      wifiName: 'GrandMumbai_Guest',
      wifiPassword: 'Guest12345',
    },
  })

  console.log('✓ Created demo hotel:', hotel.name)

  // Create UpsellDeals (for Enhance Your Stay tab)
  await prisma.upsellDeal.createMany({
    data: [
      {
        hotelId: 'demo-hotel-123',
        name: 'Suite Upgrade',
        price: 2500,
        description: 'Upgrade to our luxurious suite with city view',
        type: 'ROOM_UPGRADE',
        active: true,
      },
      {
        hotelId: 'demo-hotel-123',
        name: 'Early Check-in',
        price: 500,
        description: 'Check in as early as 9 AM',
        type: 'EXPERIENCE',
        active: true,
      },
      {
        hotelId: 'demo-hotel-123',
        name: 'Late Check-out',
        price: 800,
        description: 'Enjoy late check-out until 6 PM',
        type: 'EXPERIENCE',
        active: true,
      },
      {
        hotelId: 'demo-hotel-123',
        name: 'Spa Package',
        price: 3500,
        description: 'Couples spa session with aromatherapy',
        type: 'EXPERIENCE',
        active: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Created demo upsell deals')

  // Create some demo minibar items
  await prisma.minibarItem.createMany({
    data: [
      {
        hotelId: 'demo-hotel-123',
        name: 'Coca Cola',
        price: 40,
        category: 'Beverages',
        stockQuantity: 50,
        isAvailable: true,
      },
      {
        hotelId: 'demo-hotel-123',
        name: 'Diet Coke',
        price: 40,
        category: 'Beverages',
        stockQuantity: 30,
        isAvailable: true,
      },
      {
        hotelId: 'demo-hotel-123',
        name: 'Chips',
        price: 20,
        category: 'Snacks',
        stockQuantity: 50,
        isAvailable: true,
      },
      {
        hotelId: 'demo-hotel-123',
        name: 'Cookies',
        price: 30,
        category: 'Snacks',
        stockQuantity: 40,
        isAvailable: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Created demo minibar items')
  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
