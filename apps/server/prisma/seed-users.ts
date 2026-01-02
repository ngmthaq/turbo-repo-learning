import * as bcrypt from 'bcrypt';

import { PrismaClient } from '../prisma-generated/client';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('P@ssw0rd', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@seeder.com',
      name: 'Admin',
      role: 'SUPER_ADMIN',
      password: hashedPassword,
      activatedAt: new Date(),
    },
  });

  const alice = await prisma.user.create({
    data: {
      email: 'alice@seeder.com',
      name: 'Alice',
      role: 'ADMIN',
      password: hashedPassword,
      activatedAt: new Date(),
    },
  });

  const bob = await prisma.user.create({
    data: {
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
