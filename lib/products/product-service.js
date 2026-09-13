import prisma from "@/lib/db/prisma";

import { validateProductInput } from "./product-validation";

async function validateCategory({ tenantId, categoryId }) {
  if (!categoryId) {
    return;
  }

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      tenantId,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  if (!category) {
    throw new Error("Invalid category");
  }
}

async function checkProductIdentifiers({
  tenantId,
  sku,
  barcode,
  excludeProductId = null,
}) {
  if (sku) {
    const existingSku = await prisma.product.findFirst({
      where: {
        tenantId,
        sku,
        deletedAt: null,

        ...(excludeProductId
          ? {
              id: {
                not: excludeProductId,
              },
            }
          : {}),
      },

      select: {
        id: true,
      },
    });

    if (existingSku) {
      throw new Error("A product with this SKU already exists");
    }
  }

  if (barcode) {
    const existingBarcode = await prisma.product.findFirst({
      where: {
        tenantId,
        barcode,
        deletedAt: null,

        ...(excludeProductId
          ? {
              id: {
                not: excludeProductId,
              },
            }
          : {}),
      },

      select: {
        id: true,
      },
    });

    if (existingBarcode) {
      throw new Error("A product with this barcode already exists");
    }
  }
}

export async function createProduct({
  tenantId,
  categoryId = null,
  name,
  sku = null,
  barcode = null,
  purchasePrice = null,
  salePrice,
  minimumStock = null,
  trackStock = true,
  isActive = true,
}) {
  validateProductInput({
    name,
    purchasePrice,
    salePrice,
    minimumStock,
  });

  await validateCategory({
    tenantId,
    categoryId,
  });

  const cleanSku = sku?.trim() || null;

  const cleanBarcode = barcode?.trim() || null;

  await checkProductIdentifiers({
    tenantId,
    sku: cleanSku,
    barcode: cleanBarcode,
  });

  return await prisma.product.create({
    data: {
      tenantId,

      categoryId: categoryId || null,

      name: name.trim(),

      sku: cleanSku,

      barcode: cleanBarcode,

      purchasePrice:
        purchasePrice === "" || purchasePrice === null
          ? null
          : Number(purchasePrice),

      salePrice: Number(salePrice),

      minimumStock:
        minimumStock === "" || minimumStock === null
          ? null
          : Number(minimumStock),

      trackStock: Boolean(trackStock),

      isActive: Boolean(isActive),
    },

    include: {
      category: true,
    },
  });
}

export async function updateProduct({
  tenantId,
  productId,
  categoryId = null,
  name,
  sku = null,
  barcode = null,
  purchasePrice = null,
  salePrice,
  minimumStock = null,
  trackStock = true,
  isActive = true,
}) {
  validateProductInput({
    name,
    purchasePrice,
    salePrice,
    minimumStock,
  });

  const existingProduct = await prisma.product.findFirst({
    where: {
      id: productId,
      tenantId,
      deletedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  await validateCategory({
    tenantId,
    categoryId,
  });

  const cleanSku = sku?.trim() || null;

  const cleanBarcode = barcode?.trim() || null;

  await checkProductIdentifiers({
    tenantId,
    sku: cleanSku,
    barcode: cleanBarcode,
    excludeProductId: productId,
  });

  return await prisma.product.update({
    where: {
      id: productId,
    },

    data: {
      categoryId: categoryId || null,

      name: name.trim(),

      sku: cleanSku,

      barcode: cleanBarcode,

      purchasePrice:
        purchasePrice === "" || purchasePrice === null
          ? null
          : Number(purchasePrice),

      salePrice: Number(salePrice),

      minimumStock:
        minimumStock === "" || minimumStock === null
          ? null
          : Number(minimumStock),

      trackStock: Boolean(trackStock),

      isActive: Boolean(isActive),
    },

    include: {
      category: true,
    },
  });
}

export async function deleteProduct({ tenantId, productId }) {
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
