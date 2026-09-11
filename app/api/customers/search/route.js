import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import prisma from "@/lib/db/prisma";

export async function GET(request) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CUSTOMER_VIEW,
    });

    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";

    const customers = await prisma.customer.findMany({
      where: {
        tenantId: context.tenantId,

        deletedAt: null,

        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },

          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },

      take: 10,

      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,

      customers,
    });
  } catch (error) {
    console.error("CUSTOMER SEARCH ERROR", error);

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
