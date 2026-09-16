import prisma from "@/lib/db/prisma";

import { validateImportedProduct } from "./product-import-validation";

import { findExistingProduct } from "./product-import-matcher";

export async function importProducts({ tenantId, products }) {
  const report = {
    total: products.length,

    created: 0,

    updated: 0,

    failed: 0,

    errors: [],
  };

  for (let index = 0; index < products.length; index++) {
    const product = products[index];

    try {
      const errors = validateImportedProduct(product);

      if (errors.length) {
        report.failed++;

        report.errors.push({
          row: index + 2,

          name: product.name,

          errors,
        });

        continue;
      }

      /*
        Category handling
      */

      let category = await prisma.category.findFirst({
        where: {
          tenantId,

          name: {
            equals: product.category,

            mode: "insensitive",
          },
        },
      });

      if (!category) {
        category = await prisma.category.create({
          data: {
            tenantId,

            name: product.category,
          },
        });
      }

      /*
        Unit handling
      */

      let unit = await prisma.unit.findFirst({
        where: {
          tenantId,

          name: {
            equals: product.unit,

            mode: "insensitive",
          },
        },
      });

      if (!unit) {
        unit = await prisma.unit.create({
          data: {
            tenantId,

            name: product.unit,

            shortCode: product.unit.substring(0, 3).toUpperCase(),
          },
        });
      }

      /*
        Duplicate check
      */

      const existing = await findExistingProduct({
        tenantId,

        name: product.name,

        barcode: product.barcode,
      });

      if (existing) {
        await prisma.product.update({
          where: {
            id: existing.id,
          },

          data: {
            categoryId: category.id,

            baseUnitId: unit.id,

            purchasePrice: product.purchasePrice,

            salePrice: product.salePrice,

            minimumStock: product.minimumStock,
          },
        });

        await prisma.productUnit.updateMany({
          where: {
            productId: existing.id,

            unitId: unit.id,
          },

          data: {
            sellingPrice: product.salePrice,
          },
        });

        report.updated++;
      } else {
        const newProduct = await prisma.product.create({
          data: {
            tenantId,

            categoryId: category.id,

            baseUnitId: unit.id,

            name: product.name,

            sku: product.sku,

            barcode: product.barcode,

            purchasePrice: product.purchasePrice,

            salePrice: product.salePrice,

            minimumStock: product.minimumStock,

            productUnits: {
              create: {
                tenantId,

                unitId: unit.id,

                conversion: 1,

                sellingPrice: product.salePrice,
              },
            },
          },
        });

        report.created++;
      }
    } catch (error) {
      report.failed++;

      report.errors.push({
        row: index + 2,

        name: product.name,

        error: error.message,
      });
    }
  }

  return report;
}
