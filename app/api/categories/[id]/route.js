import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import { getCategoryById } from "@/lib/categories/category-query";

import {
  updateCategory,
  deleteCategory,
} from "@/lib/categories/category-service";

export async function GET(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CATEGORY_VIEW,
    });

    const { id } = await params;

    const category = await getCategoryById({
      tenantId: context.tenantId,

      categoryId: id,
    });

    return NextResponse.json({
      success: true,

      category,
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

export async function PATCH(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CATEGORY_UPDATE,
    });

    const { id } = await params;

    const body = await request.json();

    const category = await updateCategory({
      tenantId: context.tenantId,

      categoryId: id,

      name: body.name,
    });

    return NextResponse.json({
      success: true,

      category,
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

export async function DELETE(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CATEGORY_DELETE,
    });

    const { id } = await params;

    await deleteCategory({
      tenantId: context.tenantId,

      categoryId: id,
    });

    return NextResponse.json({
      success: true,

      message: "Category deleted",
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
