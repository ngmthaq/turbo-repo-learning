import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../prisma-generated/client';

import { seedRbac } from './seed-rbac';
import { seedUsers } from './seed-users';

main();

async function main() {
  const adapter = new PrismaMariaDb({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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
