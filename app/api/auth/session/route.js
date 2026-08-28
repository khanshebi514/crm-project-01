import { NextResponse } from "next/server";

import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

export async function GET() {
  try {
    const token = await getSessionCookie();

    if (!token) {
      return NextResponse.json({
        authenticated: false,
      });
    }

    const session = await resolveSession(token);

    return NextResponse.json({
      authenticated: true,

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
      },
      {
        status: 401,
      },
    );
  }
}
