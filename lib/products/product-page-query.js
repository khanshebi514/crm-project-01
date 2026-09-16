import prisma from "@/lib/db/prisma";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

export async function getProductsServer() {
  const token = await getSessionCookie();

  const session = await resolveSession(token);

  const context = await authorize({
    authenticatedUserId: session.user.id,

    activeTenantId: session.activeTenantId,

    permission: PERMISSIONS.PRODUCT_VIEW,
  });

  const products = await prisma.product.findMany({
    where: {
      tenantId: context.tenantId,

      deletedAt: null,
    },

    include: {
      category: true,

      baseUnit: true,

      productUnits: {
        include: {
          unit: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,

    purchasePrice: product.purchasePrice ? Number(product.purchasePrice) : null,

    salePrice: Number(product.salePrice),

    minimumStock: product.minimumStock ? Number(product.minimumStock) : null,

    productUnits: product.productUnits.map((item) => ({
      ...item,

      conversion: Number(item.conversion),

      sellingPrice: Number(item.sellingPrice),
    })),
  }));
}
