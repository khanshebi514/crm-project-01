import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";
import { PERMISSIONS } from "@/lib/security/permissions";

import { createCustomer, getCustomers } from "@/lib/customers/customer-service";

export async function POST(request) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CUSTOMER_CREATE,
    });

    const body = await request.json();

    const customer = await createCustomer({
      tenantId: context.tenantId,

      name: body.name,

      phone: body.phone ?? null,

      email: body.email || null,

      openingBalance: body.openingBalance ?? 0,
    });

    return NextResponse.json({
      success: true,

      customer,
    });
  } catch (error) {
    console.error("CREATE CUSTOMER ERROR", error);

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

export async function GET() {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CUSTOMER_VIEW,
    });

    const customers = await getCustomers(context.tenantId);

    return NextResponse.json({
      success: true,

      customers,
    });
  } catch (error) {
    console.error("GET CUSTOMERS ERROR", error);

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
