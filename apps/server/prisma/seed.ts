import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../prisma-generated/client';

import { seedRbac } from './seed-rbac';
import { seedRole } from './seed-role';
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
    // eslint-disable-next-line no-console
    console.log('🌱 Seeding roles...');
    await seedRole(prisma);

    // eslint-disable-next-line no-console
    console.log('🌱 Seeding RBAC permissions...');
    await seedRbac(prisma);

    // eslint-disable-next-line no-console
    console.log('🌱 Seeding users...');
    await seedUsers(prisma);

    // eslint-disable-next-line no-console
    console.log('✅ Seeding completed successfully!');
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}
