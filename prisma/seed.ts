// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  // Clear existing data for fresh seeding
  await prisma.serviceTask.deleteMany();
  await prisma.upsellDeal.deleteMany();

  // Create realistic UpsellDeal records
  console.log('📦 Creating UpsellDeal records...');
  await prisma.upsellDeal.createMany({
    data: [
      {
        name: 'Premium Suite Upgrade',
        price: 2499.00,
        description: 'Upgrade to our luxurious premium suite with panoramic city view, king-size bed, marble bathroom, complimentary minibar, and express checkout service.',
        imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
        type: 'ROOM_UPGRADE'
      },
      {
        name: 'Gourmet Breakfast Buffet',
        price: 899.00,
        description: 'Start your day with our award-winning breakfast buffet featuring South Indian delicacies, Continental favorites, fresh tropical fruits, and barista-made coffee.',
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400',
        type: 'FOOD_BEVERAGE'
      },
      {
        name: 'Local Biryani Delivery',
        price: 299.00,
        description: 'Experience authentic Mumbai biryani from the famous Paradise Restaurant, delivered hot to your room with traditional accompaniments and dessert.',
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400',
        type: 'FOOD_BEVERAGE'
      },
      {
        name: 'Mumbai City Tour Experience',
        price: 1299.00,
        description: 'Private guided tour of Mumbai\'s iconic landmarks including Gateway of India, Marine Drive, and Dhobi Ghat with luxury transport and lunch included.',
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400',
        type: 'EXPERIENCE'
      }
    ]
  });

  // Create realistic ServiceTask records (some completed for demo)
  console.log('✅ Creating ServiceTask records...');
  await prisma.serviceTask.createMany({
    data: [
      {
        title: 'Room 204: Extra Towels Request',
        status: 'COMPLETE',
        roomNumber: '204'
      },
      {
        title: 'Room 318: Late Checkout Request',
        status: 'COMPLETE',
        roomNumber: '318'
      },
      {
        title: 'Room 102: Room Service - Coffee & Snacks',
        status: 'IN_PROGRESS',
        roomNumber: '102'
      }
    ]
  });

  console.log('🎉 Seeding finished successfully!');
  console.log('✅ Created 4 UpsellDeal records');
  console.log('✅ Created 3 ServiceTask records');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
