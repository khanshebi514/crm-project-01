import prisma from "@/lib/db/prisma";

export async function getCustomersForExport(tenantId) {
  const customers = await prisma.customer.findMany({
    where: {
      tenantId,

      deletedAt: null,
    },

    include: {
      sales: {
        select: {
          total: true,

          createdAt: true,
        },
      },

      payments: {
        select: {
          amount: true,

          createdAt: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return customers.map((customer) => {
    const totalSales = customer.sales.reduce(
      (sum, sale) => sum + Number(sale.total),
      0,
    );

    const totalPaid = customer.payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    const currentBalance =
      Number(customer.openingBalance) + totalSales - totalPaid;

    const activityDates = [
      customer.updatedAt,

      ...customer.sales.map((sale) => sale.createdAt),

      ...customer.payments.map((payment) => payment.createdAt),
    ];

    const lastActivity = activityDates.sort(
      (a, b) => new Date(b) - new Date(a),
    )[0];

    return {
      name: customer.name,

      phone: customer.phone || "",

      email: customer.email || "",

      openingBalance: Number(customer.openingBalance),

      totalSales,

      totalPaid,

      currentBalance,

      lastActivity,

      createdAt: customer.createdAt,

      status: customer.isActive ? "Active" : "Inactive",
    };
  });
}
