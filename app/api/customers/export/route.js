import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import { getCustomersForExport } from "@/lib/customers/customer-export-query";

export async function GET() {
  try {
    const token = await getSessionCookie();

    const session = await resolveSession(token);

    const context = await authorize({
      authenticatedUserId: session.user.id,

      activeTenantId: session.activeTenantId,

      permission: PERMISSIONS.CUSTOMER_VIEW,
    });

    const customers = await getCustomersForExport(context.tenantId);

    const headers = [
      "Name",

      "Phone",

      "Email",

      "Opening Balance",

      "Total Sales",

      "Total Paid",

      "Current Balance",

      "Last Activity",

      "Created Date",

      "Status",
    ];

    const rows = customers.map((customer) => [
      customer.name,

      customer.phone,

      customer.email,

      customer.openingBalance,

      customer.totalSales,

      customer.totalPaid,

      customer.currentBalance,

      customer.lastActivity
        ? new Date(customer.lastActivity).toISOString().split("T")[0]
        : "",

      customer.createdAt
        ? new Date(customer.createdAt).toISOString().split("T")[0]
        : "",

      customer.status,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n",
    );

    return new NextResponse(csv, {
      status: 200,

      headers: {
        "Content-Type": "text/csv",

        "Content-Disposition": 'attachment; filename="SAI_Customers.csv"',
      },
    });
  } catch (error) {
    console.error("CUSTOMER EXPORT ERROR", error);

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
