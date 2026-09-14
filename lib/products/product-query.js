import prisma from "@/lib/db/prisma";

export async function getProducts({
  tenantId,
  search = "",
  categoryId = null,
}) {
  const products = await prisma.product.findMany({
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

      baseUnit: true,

      productUnits: {
        include: {
          unit: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,

    purchasePrice: product.purchasePrice ? Number(product.purchasePrice) : null,

    salePrice: Number(product.salePrice),

    minimumStock: product.minimumStock ? Number(product.minimumStock) : null,

    productUnits: product.productUnits.map((item) => ({
      ...item,

      conversion: Number(item.conversion),

      sellingPrice: Number(item.sellingPrice),
    })),
  }));
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

      baseUnit: true,

      productUnits: {
        include: {
          unit: true,
        },
      },

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

  return {
    ...product,

    purchasePrice: product.purchasePrice ? Number(product.purchasePrice) : null,

    salePrice: Number(product.salePrice),

    minimumStock: product.minimumStock ? Number(product.minimumStock) : null,

    productUnits: product.productUnits.map((item) => ({
      ...item,

      conversion: Number(item.conversion),

      sellingPrice: Number(item.sellingPrice),
    })),
  };
}
