import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import { getProducts } from "@/lib/products/product-service";

export async function GET() {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_VIEW,
    });

    const products = await getProducts({
      tenantId: context.tenantId,
    });

    return NextResponse.json({
      success: true,

      products,
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
