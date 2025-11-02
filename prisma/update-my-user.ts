// prisma/update-my-user.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Use a hashed password
  const password = await bcrypt.hash('YourSecureDemoPassword123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'surajmaguluri66@gmail.com' },
    update: { 
      hotelId: 'demo-hotel-123',
      name: 'Suraj Maguluri',
      // Omit password if you don't want to change it, or set password,
      // password (optional)
    },
    create: { 
      email: 'surajmaguluri66@gmail.com',
      name: 'Suraj Maguluri',
      hotelId: 'demo-hotel-123',
      password, // Required!
    }
  });

  console.log('✓ User updated:', user.email)
  console.log('✓ Hotel ID:', user.hotelId)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
