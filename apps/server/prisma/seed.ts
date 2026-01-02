import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../prisma-generated/client';

import { seedRbac } from './seed-rbac';
import { seedUsers } from './seed-users';

main();

async function main() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.NEST_APP_DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });
  try {
    await seedRbac(prisma);
    await seedUsers(prisma);
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}
