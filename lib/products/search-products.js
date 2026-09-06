import prisma from "@/lib/db/prisma";

export async function searchProducts({ tenantId, query }) {
  if (!query) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      tenantId,

      isActive: true,

      name: {
        contains: query,
        mode: "insensitive",
      },
    },

    select: {
      id: true,

      name: true,

      salePrice: true,

      sku: true,

      trackStock: true,
    },

    take: 10,
  });

  return products;
}
