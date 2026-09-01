import { NextResponse } from "next/server";

import prisma from "@/lib/db/prisma";

export async function POST(request) {
  try {
    const body = await request.json();

    const { tenantId } = body;

    if (!tenantId) {
      throw new Error("tenantId is required");
    }

    const sale = await prisma.sale.findFirst({
      where: {
        tenantId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: true,

        payments: true,

        stockMovements: true,
      },
    });

    if (!sale) {
      return NextResponse.json({
        success: false,

        message: "No sale found",
      });
    }

    const verification = {
      saleCreated: !!sale,

      itemsCreated: sale.items.length > 0,

      paymentsCreated: sale.payments.length > 0,

      stockMovementsCreated: sale.stockMovements.length > 0,
    };

    const passed = Object.values(verification).every(Boolean);

    return NextResponse.json({
      success: true,

      passed,

      verification,

      saleId: sale.id,
    });
  } catch (error) {
    console.error("SALE SYNC CHECK FAILED", error);

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
