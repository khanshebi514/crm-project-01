import prisma from "@/lib/db/prisma";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";
import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

export async function getCustomerByIdServer(id) {
  const token = await getSessionCookie();

  const session = await resolveSession(token);

  const context = await authorize({
    authenticatedUserId: session.user.id,

    activeTenantId: session.activeTenantId,

    permission: PERMISSIONS.CUSTOMER_VIEW,
  });

  const customer = await prisma.customer.findFirst({
    where: {
      id,

      tenantId: context.tenantId,

      deletedAt: null,
    },

    include: {
      sales: {
        include: {
          payments: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const totalSales = customer.sales.reduce(
    (sum, sale) => sum + Number(sale.total),
    0,
  );

  const totalPaid = customer.sales.reduce(
    (sum, sale) => sum + Number(sale.paidAmount),
    0,
  );

  const netKhata = Number(customer.openingBalance) + totalSales - totalPaid;

  return {
    ...customer,

    financialSummary: {
      previousKhata: Number(customer.openingBalance),

      totalSales,

      totalPaid,

      netKhata,
    },
  };
}
