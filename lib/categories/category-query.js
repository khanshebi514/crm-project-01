import prisma from "@/lib/db/prisma";

export async function getCategories(tenantId) {
  return await prisma.category.findMany({
    where: {
      tenantId,

      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
}

export async function getCategoryById({
  tenantId,

  categoryId,
}) {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,

      tenantId,

      deletedAt: null,
    },

    include: {
      products: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
}
