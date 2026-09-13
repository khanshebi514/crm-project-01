import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import prisma from "@/lib/db/prisma";

import { validateUnitInput } from "@/lib/units/unit-validation";

import { deleteUnit } from "@/lib/units/unit-service";

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

    const unit = await prisma.unit.findFirst({
      where: {
        id,

        tenantId: context.tenantId,

        isActive: true,
      },
    });

    if (!unit) {
      throw new Error("Unit not found");
    }

    return NextResponse.json({
      success: true,

      unit,
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

      permission: PERMISSIONS.PRODUCT_UPDATE,
    });

    const { id } = await params;

    const body = await request.json();

    validateUnitInput({
      name: body.name,

      shortCode: body.shortCode,
    });

    const existing = await prisma.unit.findFirst({
      where: {
        id,

        tenantId: context.tenantId,

        isActive: true,
      },
    });

    if (!existing) {
      throw new Error("Unit not found");
    }

    const updatedUnit = await prisma.unit.update({
      where: {
        id,
      },

      data: {
        name: body.name.trim(),

        shortCode: body.shortCode.trim().toUpperCase(),
      },
    });

    return NextResponse.json({
      success: true,

      unit: updatedUnit,
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

      permission: PERMISSIONS.PRODUCT_DELETE,
    });

    const { id } = await params;

    await deleteUnit({
      tenantId: context.tenantId,

      unitId: id,
    });

    return NextResponse.json({
      success: true,

      message: "Unit deleted",
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
