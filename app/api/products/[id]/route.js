import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import { getProductById } from "@/lib/products/product-query";

import { updateProduct, deleteProduct } from "@/lib/products/product-service";

export async function GET(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_VIEW,
    });

    const { id } = await params;

    const product = await getProductById({
      tenantId: context.tenantId,

      productId: id,
    });

    return NextResponse.json({
      success: true,

      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR", error);

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

export async function PATCH(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_UPDATE,
    });

    const { id } = await params;

    const body = await request.json();

    const product = await updateProduct({
      tenantId: context.tenantId,

      productId: id,

      categoryId: body.categoryId,

      name: body.name,

      sku: body.sku,

      barcode: body.barcode,

      buyPrice: body.buyPrice || null,

      salePrice: body.salePrice || null,

      minimumStock: body.minimumStock,

      trackStock: body.trackStock,

      isActive: body.isActive,
    });
    console.log("Updated product:", product);

    return NextResponse.json({
      success: true,

      product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR", error);

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

export async function DELETE(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_DELETE,
    });

    const { id } = await params;

    await deleteProduct({
      tenantId: context.tenantId,

      productId: id,
    });

    return NextResponse.json({
      success: true,

      message: "Product deleted",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR", error);

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
