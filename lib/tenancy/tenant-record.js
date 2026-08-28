import prisma from "@/lib/db/prisma";

import {
  CrossTenantAccessError,
  TenantRecordNotFoundError,
} from "@/lib/tenancy/tenant-errors";

import { requireTenantContext } from "@/lib/tenancy/tenant-guard";

const TENANT_MODELS = Object.freeze({
  customer: "customer",
  supplier: "supplier",
  category: "category",
  product: "product",
  sale: "sale",
  saleItem: "saleItem",
  payment: "payment",
  expense: "expense",
  stockMovement: "stockMovement",
});

function getPrismaModel(modelName) {
  const prismaModelName = TENANT_MODELS[modelName];

  if (!prismaModelName) {
    throw new Error(`Unsupported tenant-owned model: ${modelName}`);
  }

  const model = prisma[prismaModelName];

  if (!model) {
    throw new Error(`Prisma model "${prismaModelName}" is unavailable.`);
  }

  return model;
}

export async function findTenantRecord({
  context,
  modelName,
  id,
  select,
  include,
}) {
  requireTenantContext(context);

  if (!id) {
    throw new TenantRecordNotFoundError(modelName);
  }

  const model = getPrismaModel(modelName);

  const record = await model.findFirst({
    where: {
      id,
      tenantId: context.tenantId,
    },

    ...(select ? { select } : {}),
    ...(include ? { include } : {}),
  });

  if (!record) {
    throw new TenantRecordNotFoundError(modelName);
  }

  return record;
}

export async function requireSameTenantRecords({ context, records }) {
  requireTenantContext(context);

  for (const record of records) {
    if (!record) {
      throw new TenantRecordNotFoundError();
    }

    if (!record.tenantId) {
      throw new Error("Tenant validation received a record without tenantId.");
    }

    if (record.tenantId !== context.tenantId) {
      throw new CrossTenantAccessError();
    }
  }

  return true;
}

export async function requireProductForTenant({ context, productId }) {
  return findTenantRecord({
    context,
    modelName: "product",
    id: productId,
  });
}

export async function requireCustomerForTenant({ context, customerId }) {
  return findTenantRecord({
    context,
    modelName: "customer",
    id: customerId,
  });
}

export async function requireSaleForTenant({ context, saleId }) {
  return findTenantRecord({
    context,
    modelName: "sale",
    id: saleId,
  });
}

export async function requireSupplierForTenant({ context, supplierId }) {
  return findTenantRecord({
    context,
    modelName: "supplier",
    id: supplierId,
  });
}

export async function requireCategoryForTenant({ context, categoryId }) {
  return findTenantRecord({
    context,
    modelName: "category",
    id: categoryId,
  });
}
