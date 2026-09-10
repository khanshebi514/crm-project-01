import "server-only";

import prisma from "@/lib/db/prisma";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";
import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

async function getSalesContext(permission) {
  const token = await getSessionCookie();

  const session = await resolveSession(token);

  const context = await authorize({
    authenticatedUserId: session.user.id,
    activeTenantId: session.activeTenantId,
    permission,
  });

  return {
    session,
    context,
  };
}

export async function getSalesServer() {
  const { context } = await getSalesContext(PERMISSIONS.SALE_VIEW);

  return prisma.sale.findMany({
    where: {
      tenantId: context.tenantId,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      customer: true,

      _count: {
        select: {
          items: true,
        },
      },
    },

    take: 50,
  });
}

export async function getSaleByIdServer(id) {
  const { context } = await getSalesContext(PERMISSIONS.SALE_VIEW);

  const sale = await prisma.sale.findFirst({
    where: {
      id,
      tenantId: context.tenantId,
    },

    include: {
      tenant: true,

      customer: true,

      items: {
        include: {
          product: true,
        },
      },

      payments: true,

      stockMovements: true,
    },
  });

  if (!sale) {
    throw new Error("Sale not found");
  }

  return sale;
}
