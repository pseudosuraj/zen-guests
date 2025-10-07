// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // 1. Create demo hotel
  const hotel = await prisma.hotel.upsert({
    where: { id: 'demo-hotel-123' },
    update: {},
    create: {
      id: 'demo-hotel-123',
      name: 'The Grand Mumbai',
      brandColor: '#6366F1', // Purple/indigo color
    },
  })

  console.log('✓ Created demo hotel:', hotel.name)

  // 2. Create demo user (hotel owner)
  const user = await prisma.user.upsert({
    where: { email: 'owner@grandmumbai.com' },
    update: {},
    create: {
      email: 'owner@grandmumbai.com',
      name: 'Hotel Owner',
      hotelId: hotel.id,
    },
  })

  console.log('✓ Created demo user:', user.email)

  // 3. Create upsell deals
  await prisma.upsellDeal.deleteMany({ where: { hotelId: hotel.id } })
  
  const deals = await prisma.upsellDeal.createMany({
    data: [
      {
        name: 'Premium Suite Upgrade',
        price: 2499,
        description: 'Upgrade to our Premium Suite with city view, complimentary minibar, and express checkout.',
        imageUrl: '/images/room.jpg',
        type: 'ROOM_UPGRADE',
        active: true,
        hotelId: hotel.id,
      },
      {
        name: 'Gourmet Breakfast Buffet',
        price: 899,
        description: 'Start your day with our award-winning breakfast buffet featuring South Indian and Continental cuisine.',
        imageUrl: '/images/breakfast.jpg',
        type: 'FOOD_BEVERAGE',
        active: true,
        hotelId: hotel.id,
      },
      {
        name: 'Local Biryani Delivery',
        price: 450,
        description: 'Authentic Hyderabadi biryani from the best local restaurants, delivered fresh by our concierge team.',
        imageUrl: '/images/biryani.jpg',
        type: 'FOOD_BEVERAGE',
        active: true,
        hotelId: hotel.id,
      },
      {
        name: 'OTT Premium Package',
        price: 499,
        description: 'Netflix, Prime Video, Disney+ Hotstar access on your room TV plus complimentary popcorn.',
        imageUrl: '/images/ott.jpg',
        type: 'EXPERIENCE',
        active: true,
        hotelId: hotel.id,
      },
    ],
  })

  console.log(`✓ Created ${deals.count} upsell deals`)

  // 4. Create service tasks
  await prisma.serviceTask.deleteMany({ where: { hotelId: hotel.id } })
  
  const tasks = await prisma.serviceTask.createMany({
    data: [
      {
        title: 'Extra Towels Request',
        description: 'Guest requested additional towels',
        status: 'pending',
        priority: 'high',
        roomNumber: '204',
        hotelId: hotel.id,
      },
      {
        title: 'Late Checkout Request',
        description: 'Guest needs to checkout at 2 PM instead of 12 PM',
        status: 'pending',
        priority: 'medium',
        roomNumber: '318',
        hotelId: hotel.id,
      },
      {
        title: 'Room Service - Coffee & Snacks',
        description: 'Complimentary welcome refreshments',
        status: 'in-progress',
        priority: 'high',
        roomNumber: '102',
        assignedTo: 'Housekeeping Staff',
        hotelId: hotel.id,
      },
    ],
  })

  console.log(`✓ Created ${tasks.count} service tasks`)

  console.log('🎉 Seed completed successfully!')
  console.log('\n📧 Demo login email: owner@grandmumbai.com')
  console.log('🏨 Demo hotel ID: demo-hotel-123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
