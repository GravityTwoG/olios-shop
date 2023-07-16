// seeds should be idempotent
import { PrismaClient } from '@prisma/client';
import { seedInviteCodes } from './seed/inviteCodes';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    await Promise.all([seedInviteCodes(tx)]);
  });
  console.info('Seeding ended successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding Error: ', e);
    await prisma.$disconnect();
    process.exit(1);
  });
