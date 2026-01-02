import { PrismaClient } from '../prisma-generated/client';
import { Action } from '../src/feature/rbac/action';
import { Module } from '../src/feature/rbac/module';
import { Role } from '../src/feature/rbac/role';

export async function seedRbac(prisma: PrismaClient) {
  const rbacEntries = [
    // Admin permissions
    { role: Role.ADMIN, module: Module.USERS, action: Action.CREATE },
    { role: Role.ADMIN, module: Module.USERS, action: Action.DELETE },
    { role: Role.ADMIN, module: Module.USERS, action: Action.EXPORT },
    { role: Role.ADMIN, module: Module.USERS, action: Action.IMPORT },
    { role: Role.ADMIN, module: Module.USERS, action: Action.LOCK_UNLOCK },
    { role: Role.ADMIN, module: Module.USERS, action: Action.READ },
    { role: Role.ADMIN, module: Module.USERS, action: Action.UPDATE },

    // User permissions

    // Viewer permissions
  ];

  await prisma.rbac.deleteMany();

  const createdRbacEntries = await Promise.all(
    rbacEntries.map((entry) =>
      prisma.rbac.create({
        data: entry,
      }),
    ),
  );

  // eslint-disable-next-line no-console
  console.log({ createdRbacEntries });
}
