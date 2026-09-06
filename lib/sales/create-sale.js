import prisma from "@/lib/db/prisma";

export async function createSale({
  tenantId,
  userId,
  customerId,
  items,
  discount = 0,
  paidAmount = 0,
  paymentMethod = "CASH",
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const total = Math.max(subtotal - discount, 0);

  const dueAmount = Math.max(total - paidAmount, 0);

  const sale = await prisma.sale.create({
    data: {
      tenantId,

      customerId,

      subtotal,

      discount,

      total,

      paidAmount,

      dueAmount,

      items: {
        create: items.map((item) => ({
          tenantId,

          productId: item.productId,

          quantity: item.quantity,

          unitPrice: item.unitPrice,

          discount: 0,

          lineTotal: item.unitPrice * item.quantity,
        })),
      },

      payments: {
        create: {
          tenantId,

          amount: paidAmount,

          method: paymentMethod,

          status: "COMPLETED",
        },
      },
    },

    include: {
      items: true,

      payments: true,
    },
  });

  return sale;
}
