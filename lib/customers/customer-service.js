import prisma from "@/lib/db/prisma";

import { validateCustomerInput } from "./customer-validation";

export async function createCustomer({
  tenantId,
  name,
  phone,
  email,
  openingBalance = 0,
}) {
  validateCustomerInput({
    name,
    phone,
    email,
    openingBalance,
  });

  const customer = await prisma.customer.create({
    data: {
      tenantId,

      name,

      phone,

      email,

      openingBalance,
    },
  });

  return customer;
}

export async function getCustomers(tenantId) {
  return await prisma.customer.findMany({
    where: {
      tenantId,
      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCustomerById({ tenantId, customerId }) {
  const customer = await prisma.customer.findFirst({
    where: {
      id: customerId,
      tenantId,
      deletedAt: null,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
}
export async function updateCustomer({
  tenantId,
  customerId,
  name,
  phone,
  email,
}) {
  validateCustomerInput({
    name,
    phone,
    email,
  });

  const customer = await prisma.customer.updateMany({
    where: {
      id: customerId,
      tenantId,
      deletedAt: null,
    },

    data: {
      name,
      phone,
      email,
    },
  });

  if (customer.count === 0) {
    throw new Error("Customer not found");
  }

  return await getCustomerById({
    tenantId,
    customerId,
  });
}

export async function deleteCustomer({ tenantId, customerId }) {
  const customer = await prisma.customer.updateMany({
    where: {
      id: customerId,
      tenantId,
      deletedAt: null,
    },

    data: {
      deletedAt: new Date(),
    },
  });

  if (customer.count === 0) {
    throw new Error("Customer not found");
  }

  return true;
}
