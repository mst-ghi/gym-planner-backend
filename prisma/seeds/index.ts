import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import UsersDataSeeder from './users.seed';
import WorkspacesDataSeeder from './workspaces.seed';
import BodyPartsDataSeeder from './body-parts.seed';
import EquipmentsDataSeeder from './equipments.seed';

const prisma = new PrismaClient();

async function main() {
  Logger.verbose(`Start seeding ...`, 'Prisma Seeding');

  await UsersDataSeeder(prisma);
  await WorkspacesDataSeeder(prisma);
  await BodyPartsDataSeeder(prisma);
  await EquipmentsDataSeeder(prisma);

  console.log('');

  Logger.verbose(`Seeding finished.`, 'Prisma Seeding');
}

main()
  .catch((e) => {
    Logger.error(e.message, 'Prisma Seeding');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
