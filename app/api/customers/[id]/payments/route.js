import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import { createCustomerPayment } from "@/lib/payments/payment-service";

import { validatePaymentInput } from "@/lib/payments/payment-validation";

export async function POST(request, { params }) {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.PAYMENT_CREATE,
    });

    const { id } = await params;

    const body = await request.json();

    validatePaymentInput({
      amount: body.amount,
    });

    const payment = await createCustomerPayment({
      tenantId: context.tenantId,

      customerId: id,

      amount: body.amount,

      method: body.method || "CASH",

      notes: body.notes,
    });

    return NextResponse.json({
      success: true,

      payment,
    });
  } catch (error) {
    console.error("CREATE CUSTOMER PAYMENT ERROR", error);

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
