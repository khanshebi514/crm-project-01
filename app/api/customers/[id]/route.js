import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import {
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "@/lib/customers/customer-service";

export async function GET(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CUSTOMER_VIEW,
    });

    const { id } = await params;

    const customer = await getCustomerById({
      tenantId: context.tenantId,

      customerId: id,
    });

    return NextResponse.json({
      success: true,

      customer,
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

      permission: PERMISSIONS.CUSTOMER_UPDATE,
    });

    const body = await request.json();

    const { id } = await params;

    const customer = await updateCustomer({
      tenantId: context.tenantId,

      customerId: id,

      name: body.name,

      phone: body.phone ?? null,

      email: body.email || null,
    });

    return NextResponse.json({
      success: true,

      customer,
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

      permission: PERMISSIONS.CUSTOMER_DELETE,
    });

    const { id } = await params;

    await deleteCustomer({
      tenantId: context.tenantId,

      customerId: id,
    });

    return NextResponse.json({
      success: true,

      message: "Customer deleted",
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
