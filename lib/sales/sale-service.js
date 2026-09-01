import prisma from "@/lib/db/prisma";

import { validateSaleInput } from "./sale-validation";

import { calculateSaleTotals } from "./sale-calculator";

function generateSaleNumber() {
  return `SALE-${Date.now()}`;
}

function determineSaleStatus({ total, paidAmount }) {
  if (paidAmount <= 0) {
    return "UNPAID";
  }

  if (paidAmount >= total) {
    return "COMPLETED";
  }

  return "PARTIALLY_PAID";
}

export async function createSale({
  tenantId,
  userId,
  customerId = null,

  items,

  discount = 0,
  tax = 0,

  paidAmount = 0,

  paymentMethod = "CASH",
}) {
  validateSaleInput({
    items,
    discount,
    tax,
    paidAmount,
  });

  const totals = calculateSaleTotals({
    items,
    discount,
    tax,
    paidAmount,
  });

  const status = determineSaleStatus({
    total: totals.total,
    paidAmount: totals.paidAmount,
  });

  return await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        tenantId,

        customerId,

        saleNumber: generateSaleNumber(),

        status,

        subtotal: totals.subtotal,

        discount: totals.discount,

        tax: totals.tax,

        total: totals.total,

        paidAmount: totals.paidAmount,

        dueAmount: totals.dueAmount,
      },
    });

    for (const item of items) {
      const lineTotal = Number(item.quantity) * Number(item.unitPrice);

      await tx.saleItem.create({
        data: {
          tenantId,

          saleId: sale.id,

          productId: item.productId,

          quantity: item.quantity,

          unitPrice: item.unitPrice,

          discount: item.discount ?? 0,

          lineTotal,
        },
      });

      await tx.stockMovement.create({
        data: {
          tenantId,

          productId: item.productId,

          saleId: sale.id,

          type: "SALE",

          quantity: item.quantity,
        },
      });
    }

    if (paidAmount > 0) {
      await tx.payment.create({
        data: {
          tenantId,

          saleId: sale.id,

          amount: paidAmount,

          method: paymentMethod,

          status: "COMPLETED",

          paidAt: new Date(),
        },
      });
    }

    return sale;
  });
}
