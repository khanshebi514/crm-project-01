import prisma from "@/lib/db/prisma";

import { validateProductInput } from "./product-validation";

export async function createProduct({
  tenantId,

  categoryId = null,

  baseUnitId = null,

  name,

  sku = null,

  barcode = null,
  buyPrice = null,
  salePrice = null,

  minimumStock = null,

  trackStock = true,

  productUnits = [],
}) {
  validateProductInput({
    name,
    unitId: baseUnitId,
    productUnits,
  });

  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        tenantId,

        categoryId,

        baseUnitId,

        name,

        sku,

        barcode,

        purchasePrice: buyPrice ? Number(buyPrice) : null,

        salePrice: salePrice ? Number(salePrice) : 0,

        minimumStock: minimumStock ? Number(minimumStock) : null,

        trackStock: Boolean(trackStock),
      },
    });

    if (productUnits.length) {
      await tx.productUnit.createMany({
        data: productUnits.map((item) => ({
          tenantId,

          productId: product.id,

          unitId: item.unitId,

          conversion: Number(item.conversion),

          sellingPrice: Number(item.sellingPrice),
        })),
      });
    }

    return await tx.product.findFirst({
      where: {
        id: product.id,
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
    });
  });
}
export async function updateProduct({
  tenantId,

  productId,

  categoryId = null,

  baseUnitId = null,

  name,

  sku = null,

  barcode = null,

  buyPrice = null,

  salePrice: salePrice = null,

  minimumStock = null,

  trackStock = true,

  productUnits = [],
}) {
  validateProductInput({
    name,
  });

  return await prisma.$transaction(async (tx) => {
    const existing = await tx.product.findFirst({
      where: {
        id: productId,

        tenantId,

        deletedAt: null,
      },
    });

    if (!existing) {
      throw new Error("Product not found");
    }

    const product = await tx.product.update({
      where: {
        id: productId,
      },

      data: {
        categoryId,

        baseUnitId,

        name,

        sku,

        barcode,

        minimumStock: minimumStock ? Number(minimumStock) : null,

        trackStock: Boolean(trackStock),
      },
    });

    // Remove old product units

    await tx.productUnit.deleteMany({
      where: {
        productId,

        tenantId,
      },
    });

    // Create new product units

    if (productUnits.length) {
      await tx.productUnit.createMany({
        data: productUnits.map((item) => ({
          tenantId,

          productId: product.id,

          unitId: item.unitId,

          conversion: Number(item.conversion),

          sellingPrice: Number(item.sellingPrice),
        })),
      });
    }

    return await tx.product.findFirst({
      where: {
        id: product.id,
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
    });
  });
}
export async function deleteProduct({
  tenantId,

  productId,
}) {
  const result = await prisma.product.updateMany({
    where: {
      id: productId,

      tenantId,

      deletedAt: null,
    },

    data: {
      deletedAt: new Date(),

      isActive: false,
    },
  });

  if (result.count === 0) {
    throw new Error("Product not found");
  }

  return true;
}
