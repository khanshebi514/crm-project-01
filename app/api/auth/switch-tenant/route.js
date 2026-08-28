import { NextResponse } from "next/server";

import prisma from "@/lib/db/prisma";

import { getSessionCookie } from "@/lib/auth/cookies";

import { getSessionByToken } from "@/lib/auth/session";

export async function POST(request) {
  try {
    const token = await getSessionCookie();

    const session = await getSessionByToken(token);

    const { tenantId } = await request.json();

    const membership = await prisma.membership.findFirst({
      where: {
        userId: session.userId,

        tenantId,

        status: "ACTIVE",
      },
    });

    if (!membership) {
      return NextResponse.json(
        {
          success: false,

          message: "Tenant access denied.",
        },
        {
          status: 403,
        },
      );
    }

    await prisma.authSession.update({
      where: {
        id: session.id,
      },

      data: {
        activeTenantId: tenantId,
      },
    });

    return NextResponse.json({
      success: true,

      message: "Tenant switched successfully.",
    });
  } catch (error) {
    console.error("TENANT SWITCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Tenant switch failed.",
      },
      {
        status: 500,
      },
    );
  }
}
