import { NextResponse } from "next/server";

import prisma from "@/lib/db/prisma";

export async function POST() {
  try {
    console.log("CREATE SALE SYNC TEST ENVIRONMENT");

    const tenant = await prisma.tenant.create({
      data: {
        name: `Sale Sync Tenant ${Date.now()}`,
      },
    });

    const user = await prisma.user.create({
      data: {
        name: "Sale Sync Test User",

        email: `sale-sync-${Date.now()}@test.com`,

        passwordHash: "test",
      },
    });

    const product = await prisma.product.create({
      data: {
        tenantId: tenant.id,

        name: "Offline Sync Product",

        purchasePrice: 50,

        salePrice: 100,

        trackStock: true,
      },
    });

    console.log("✓ Sale sync environment created");

    return NextResponse.json({
      success: true,

      environment: {
        tenantId: tenant.id,

        userId: user.id,

        productId: product.id,
      },
    });
  } catch (error) {
    console.error("CREATE SALE SYNC ENV ERROR", error);

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
