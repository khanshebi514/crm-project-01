import prisma from "@/lib/db/prisma";

export async function getProducts({ tenantId }) {
  return prisma.product.findMany({
    where: {
      tenantId,

      isActive: true,

      deletedAt: null,
    },

    orderBy: {
      name: "asc",
    },
  });
}
