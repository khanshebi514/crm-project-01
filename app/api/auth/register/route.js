import { NextResponse } from "next/server";

import { registerUser } from "@/lib/auth/auth";
import { createSession } from "@/lib/auth/session";
import { setSessionCookie } from "@/lib/auth/cookies";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, password, tenantName } = body;

    if (!name || !email || !password || !tenantName) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await registerUser({
      name,
      email,
      password,
      tenantName,
    });

    const session = await createSession({
      userId: result.user.id,

      activeTenantId: result.tenant.id,
    });

    await setSessionCookie(session.token);

    return NextResponse.json(
      {
        success: true,

        message: "Registration successful.",

        user: {
          id: result.user.id,

          email: result.user.email,
        },

        tenant: {
          id: result.tenant.id,

          name: result.tenant.name,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: error.message || "Registration failed.",
      },
      {
        status: 500,
      },
    );
  }
}
