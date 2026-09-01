import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import { createSale } from "@/lib/sales/sale-service";

import prisma from "@/lib/db/prisma";

export async function POST(request) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.SALE_CREATE,
    });

    const body = await request.json();

    const sale = await createSale({
      tenantId: context.tenantId,

      userId: session.user.id,

      customerId: body.customerId ?? null,

      items: body.items,

      discount: body.discount ?? 0,

      tax: body.tax ?? 0,

      paidAmount: body.paidAmount ?? 0,

      paymentMethod: body.paymentMethod ?? "CASH",
    });

    return NextResponse.json({
      success: true,

      sale,
    });
  } catch (error) {
    console.error("CREATE SALE ERROR", error);

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

export async function GET() {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.SALE_VIEW,
    });

    const sales = await prisma.sale.findMany({
      where: {
        tenantId: context.tenantId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: true,

        payments: true,
      },
    });

    return NextResponse.json({
      success: true,

      sales,
    });
  } catch (error) {
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
