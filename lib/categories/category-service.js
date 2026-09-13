import prisma from "@/lib/db/prisma";

import { validateCategoryInput } from "./category-validation";

export async function createCategory({
  tenantId,

  name,
}) {
  validateCategoryInput({
    name,
  });

  const existing = await prisma.category.findFirst({
    where: {
      tenantId,

      name,

      deletedAt: null,
    },
  });

  if (existing) {
    throw new Error("Category already exists");
  }

  return await prisma.category.create({
    data: {
      tenantId,

      name: name.trim(),
    },
  });
}

export async function updateCategory({
  tenantId,

  categoryId,

  name,
}) {
  validateCategoryInput({
    name,
  });

  const result = await prisma.category.updateMany({
    where: {
      id: categoryId,

      tenantId,

      deletedAt: null,
    },

    data: {
      name: name.trim(),
    },
  });

  if (result.count === 0) {
    throw new Error("Category not found");
  }

  return await prisma.category.findFirst({
    where: {
      id: categoryId,

      tenantId,

      deletedAt: null,
    },
  });
}

export async function deleteCategory({
  tenantId,

  categoryId,
}) {
  const result = await prisma.category.updateMany({
    where: {
      id: categoryId,

      tenantId,

      deletedAt: null,
    },

    data: {
      deletedAt: new Date(),
    },
  });

  if (result.count === 0) {
    throw new Error("Category not found");
  }

  return true;
}
