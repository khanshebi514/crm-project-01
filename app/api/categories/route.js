import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import { createCategory } from "@/lib/categories/category-service";

import { getCategories } from "@/lib/categories/category-query";

export async function GET() {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CATEGORY_VIEW,
    });

    const categories = await getCategories(context.tenantId);

    return NextResponse.json({
      success: true,

      categories,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR", error);

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

export async function POST(request) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CATEGORY_CREATE,
    });

    const body = await request.json();

    const category = await createCategory({
      tenantId: context.tenantId,

      name: body.name,
    });

    return NextResponse.json({
      success: true,

      category,
    });
  } catch (error) {
    console.error("CREATE CATEGORY ERROR", error);

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
