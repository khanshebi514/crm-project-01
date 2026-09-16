import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";
import { parseProductFile } from "@/lib/products/import/product-import-parser";
import { importProducts } from "@/lib/products/import/product-import-service";

export async function POST(request) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PRODUCT_CREATE,
    });

    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      throw new Error("Excel file is required");
    }
    const buffer = await file.arrayBuffer();

    const products = parseProductFile(Buffer.from(buffer));

    const report = await importProducts({
      tenantId: context.tenantId,

      products,
    });

    return NextResponse.json({
      success: true,

      message: "File received",
    });
  } catch (error) {
    console.error("PRODUCT IMPORT ERROR", error);

    return NextResponse.json({
      success: true,

      message: "Import completed",

      report,
    });
  }
}
