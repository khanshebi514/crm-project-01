import prisma from "@/lib/db/prisma";

export async function createCustomerPayment({
  tenantId,

  customerId,

  amount,

  method,

  notes,
}) {
  const payment = await prisma.payment.create({
    data: {
      tenantId,

      customerId,

      amount,

      method,

      notes,

      status: "COMPLETED",

      paidAt: new Date(),
    },
  });

  return payment;
}

export async function getCustomerPayments({
  tenantId,

  customerId,
}) {
  return await prisma.payment.findMany({
    where: {
      tenantId,

      customerId,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}
