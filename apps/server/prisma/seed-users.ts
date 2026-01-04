import * as bcrypt from 'bcrypt';

import { PrismaClient } from '../prisma-generated/client';

export async function seedUsers(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash('P@ssw0rd', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@seeder.com' },
    update: {
      name: 'Admin',
      role: 'SUPER_ADMIN',
      password: hashedPassword,
      activatedAt: new Date(),
    },
    create: {
      email: 'admin@seeder.com',
      name: 'Admin',
      role: 'SUPER_ADMIN',
      password: hashedPassword,
      activatedAt: new Date(),
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: 'alice@seeder.com' },
    update: {
      name: 'Alice',
      role: 'ADMIN',
      password: hashedPassword,
      activatedAt: new Date(),
    },
    create: {
      email: 'alice@seeder.com',
      name: 'Alice',
      role: 'ADMIN',
      password: hashedPassword,
      activatedAt: new Date(),
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@seeder.com' },
    update: {
      name: 'Bob',
      role: 'USER',
      password: hashedPassword,
      activatedAt: new Date(),
    },
    create: {
      email: 'bob@seeder.com',
      name: 'Bob',
      role: 'USER',
      password: hashedPassword,
      activatedAt: new Date(),
    },
  });

  // eslint-disable-next-line no-console
  console.log({ admin, alice, bob });
}
