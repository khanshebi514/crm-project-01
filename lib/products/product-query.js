import prisma from "@/lib/db/prisma";

export async function getProducts({
  tenantId,
  search = "",
  categoryId = null,
}) {
  return await prisma.product.findMany({
    where: {
      tenantId,
      deletedAt: null,

      ...(categoryId
        ? {
            categoryId,
          }
        : {}),

      ...(search.trim()
        ? {
            OR: [
              {
                name: {
                  contains: search.trim(),
                  mode: "insensitive",
                },
              },

              {
                sku: {
                  contains: search.trim(),
                  mode: "insensitive",
                },
              },

              {
                barcode: {
                  contains: search.trim(),
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },

    include: {
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById({ tenantId, productId }) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      tenantId,
      deletedAt: null,
    },

    include: {
      category: true,

      stockMovements: {
        orderBy: {
          createdAt: "desc",
        },

        take: 50,
      },
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
