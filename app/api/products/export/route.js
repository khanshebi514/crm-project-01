import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import prisma from "@/lib/db/prisma";

import { generateProductExcel } from "@/lib/products/export/product-export-service";

export async function GET() {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_VIEW,
    });

    const products = await prisma.product.findMany({
      where: {
        tenantId: context.tenantId,

        deletedAt: null,
      },

      include: {
        category: true,

        baseUnit: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const fileBuffer = generateProductExcel(products);

    return new NextResponse(fileBuffer, {
      status: 200,

      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "Content-Disposition": "attachment; filename=products.xlsx",
      },
    });
  } catch (error) {
    console.error("PRODUCT EXPORT ERROR", error);

    return NextResponse.json(
      {
        success: false,

        message: error.message,
      },

      {
        status: 400,
      },
    );
  }
}
