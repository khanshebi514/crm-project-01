import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import prisma from "@/lib/db/prisma";

export async function GET(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.SALE_VIEW,
    });

    const { id } = await params;

    const sale = await prisma.sale.findFirst({
      where: {
        id,

        tenantId: context.tenantId,
      },

      include: {
        customer: true,

        items: {
          include: {
            product: true,
          },
        },

        payments: true,

        stockMovements: true,
      },
    });

    if (!sale) {
      return NextResponse.json(
        {
          success: false,

          message: "Sale not found",
        },

        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      sale,
    });
  } catch (error) {
    console.error("GET SALE ERROR", error);

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
