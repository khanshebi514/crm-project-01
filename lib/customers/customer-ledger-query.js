import { getCustomerByIdServer } from "./customer-query";

import prisma from "@/lib/db/prisma";

export async function getCustomerLedgerServer(customerId) {
  const customer = await getCustomerByIdServer(customerId);

  const payments = await prisma.payment.findMany({
    where: {
      customerId,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  const ledger = [];

  customer.sales.forEach((sale) => {
    ledger.push({
      id: sale.id,

      type: "SALE",

      date: sale.createdAt,

      amount: Number(sale.total),

      description: sale.saleNumber,
    });
  });

  payments.forEach((payment) => {
    ledger.push({
      id: payment.id,

      type: "PAYMENT",

      date: payment.createdAt,

      amount: Number(payment.amount),

      description: payment.method,
    });
  });

  ledger.sort((a, b) => new Date(a.date) - new Date(b.date));

  let balance = customer.financialSummary.previousKhata;

  const finalLedger = ledger.map((entry) => {
    if (entry.type === "SALE") {
      balance += entry.amount;
    }

    if (entry.type === "PAYMENT") {
      balance -= entry.amount;
    }

    return {
      ...entry,

      balance,
    };
  });

  return {
    customer,

    ledger: finalLedger,
  };
}
