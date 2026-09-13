import prisma from "@/lib/db/prisma";

import { validateUnitInput } from "./unit-validation";

export async function createUnit({
  tenantId,

  name,

  shortCode,
}) {
  validateUnitInput({
    name,

    shortCode,
  });

  const exists = await prisma.unit.findFirst({
    where: {
      tenantId,

      name,
    },
  });

  if (exists) {
    throw new Error("Unit already exists");
  }

  return await prisma.unit.create({
    data: {
      tenantId,

      name: name.trim(),

      shortCode: shortCode.trim().toUpperCase(),
    },
  });
}

export async function deleteUnit({
  tenantId,

  unitId,
}) {
  const result = await prisma.unit.updateMany({
    where: {
      id: unitId,

      tenantId,
    },

    data: {
      isActive: false,
    },
  });

  if (result.count === 0) {
    throw new Error("Unit not found");
  }

  return true;
}
