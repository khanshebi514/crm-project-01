import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { isPlatformAdmin } from "@/lib/auth/route-access";

export async function GET() {
  try {
    const token = await getSessionCookie();

    if (!token) {
      return NextResponse.json({
        authenticated: false,
      });
    }

    const session = await resolveSession(token);

    const admin = await isPlatformAdmin(session.user.id);

    return NextResponse.json({
      authenticated: true,

      isAdmin: admin,

      user: {
        id: session.user.id,

        email: session.user.email,

        name: session.user.name,
      },

      activeTenantId: session.activeTenantId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        authenticated: false,

        message: "Session invalid.",
      },
      {
        status: 401,
      },
    );
  }
}
