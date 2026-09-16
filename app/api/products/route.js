import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import { createProduct } from "@/lib/products/product-service";

export async function POST(request) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_CREATE,
    });

    const body = await request.json();

    const product = await createProduct({
      tenantId: context.tenantId,

      categoryId: body.categoryId || null,

      baseUnitId: body.baseUnitId || null,

      name: body.name,

      sku: body.sku || null,
      purchasePrice: body.purchasePrice || null,
      salePrice: body.salePrice || null,

      barcode: body.barcode || null,

      minimumStock: body.minimumStock,

      trackStock: body.trackStock,

      productUnits: body.productUnits || [],
    });

    return NextResponse.json({
      success: true,

      product,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR", error);

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
