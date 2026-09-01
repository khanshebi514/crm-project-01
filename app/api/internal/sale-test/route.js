import { NextResponse } from "next/server";

import prisma from "@/lib/db/prisma";

import { createSale } from "@/lib/sales/sale-service";

export async function POST() {
  try {
    console.log("==============================");
    console.log("SAI SALE SERVICE TEST");
    console.log("==============================");

    const tenant = await prisma.tenant.create({
      data: {
        name: `Sale Test Tenant ${Date.now()}`,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: `sale-test-${Date.now()}@test.com`,

        name: "Sale Test User",

        passwordHash: "test",
      },
    });

    const product = await prisma.product.create({
      data: {
        tenantId: tenant.id,

        name: "Test Product",

        salePrice: 100,

        purchasePrice: 50,

        trackStock: true,
      },
    });

    console.log("✓ Test environment created");

    const sale = await createSale({
      tenantId: tenant.id,

      userId: user.id,

      items: [
        {
          productId: product.id,

          quantity: 2,

          unitPrice: 100,
        },
      ],

      discount: 0,

      tax: 0,

      paidAmount: 200,

      paymentMethod: "CASH",
    });

    console.log("✓ Sale created", sale);

    const saleItems = await prisma.saleItem.findMany({
      where: {
        saleId: sale.id,
      },
    });

    const payments = await prisma.payment.findMany({
      where: {
        saleId: sale.id,
      },
    });

    const movements = await prisma.stockMovement.findMany({
      where: {
        saleId: sale.id,
      },
    });

    if (!saleItems.length) {
      throw new Error("Sale items missing");
    }

    if (!payments.length) {
      throw new Error("Payment missing");
    }

    if (!movements.length) {
      throw new Error("Stock movement missing");
    }

    console.log("✓ Sale items verified");

    console.log("✓ Payment verified");

    console.log("✓ Stock movement verified");

    return NextResponse.json({
      success: true,

      message: "SAI SALE SERVICE TEST PASSED",

      sale,

      saleItems,

      payments,

      movements,
    });
  } catch (error) {
    console.error("SALE TEST FAILED", error);

    return NextResponse.json(
      {
        success: false,

        message: error.message,
      },

      {
        status: 500,
      },
    );
  }
}
