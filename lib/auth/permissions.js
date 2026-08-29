import prisma from "@/lib/db/prisma";

/**
 * Get all permissions of a user
 * inside a specific tenant
 */
export async function getUserPermissions(userId, tenantId) {
  const membership = await prisma.membership.findFirst({
    where: {
      userId,

      tenantId,

      status: "ACTIVE",
    },
  });

  if (!membership) {
    return [];
  }

  const permissions = await prisma.rolePermission.findMany({
    where: {
      role: membership.role,
    },

    include: {
      permission: true,
    },
  });

  return permissions.map((item) => item.permission.key);
}

/**
 * Check permission
 */
export async function can(userId, tenantId, permissionKey) {
  const permissions = await getUserPermissions(userId, tenantId);

  return permissions.includes(permissionKey);
}

/**
 * Require permission
 */
export async function requirePermission(userId, tenantId, permissionKey) {
  const allowed = await can(userId, tenantId, permissionKey);

  if (!allowed) {
    throw new Error("Permission denied");
  }

  return true;
}
