import prisma from "@/lib/db/prisma";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

export async function getUnitsServer() {
  const token = await getSessionCookie();

  const session = await resolveSession(token);

  const context = await authorize({
    authenticatedUserId: session.user.id,

    activeTenantId: session.activeTenantId,

    permission: PERMISSIONS.PRODUCT_VIEW,
  });

  return await prisma.unit.findMany({
    where: {
      tenantId: context.tenantId,

      isActive: true,
    },

    orderBy: {
      name: "asc",
    },
  });
}
