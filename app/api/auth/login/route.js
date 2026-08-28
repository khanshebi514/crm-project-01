import { NextResponse } from "next/server";

import { authenticateUser } from "@/lib/auth/auth";

import { setSessionCookie } from "@/lib/auth/cookies";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    const result = await authenticateUser({
      email,
      password,
    });

    await setSessionCookie(result.session.token);

    return NextResponse.json({
      success: true,

      message: "Login successful.",

      user: {
        id: result.user.id,

        email: result.user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: error.message || "Login failed.",
      },
      {
        status: 401,
      },
    );
  }
}
