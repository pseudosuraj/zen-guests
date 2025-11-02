// resetDb.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  await prisma.user.deleteMany({});
  await prisma.hotel.deleteMany({});
  // Repeat for any other table you want wiped (session, account, etc)
  console.log('All users and hotels deleted!');
}
run().finally(() => prisma.$disconnect());
