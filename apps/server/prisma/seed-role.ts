import { PrismaClient } from '../prisma-generated/client';
import { DefaultRole } from '../src/feature/rbac/default-role';

export async function seedRole(prisma: PrismaClient) {
  const roles = await Promise.all(
    Object.values(DefaultRole).map(async (roleName) => {
      return prisma.role.upsert({
        where: { name: roleName },
        update: { name: roleName },
        create: { name: roleName, description: getRoleDescription(roleName) },
      });
    }),
  );

  // eslint-disable-next-line no-console
  console.log(`✓ Seeded ${roles.length} roles`);
}

function getRoleDescription(roleName: string): string {
  const descriptions: Record<string, string> = {
    [DefaultRole.SUPER_ADMIN]: 'Full system access with all permissions',
    [DefaultRole.ADMIN]: 'Administrative access with management capabilities',
    [DefaultRole.USER]: 'Standard user with read-only access',
  };

  return descriptions[roleName] || '';
}
