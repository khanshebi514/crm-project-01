import { NextResponse } from "next/server";

import { getSessionCookie, clearSessionCookie } from "@/lib/auth/cookies";

import { logoutUser } from "@/lib/auth/auth";

export async function POST() {
  try {
    const token = await getSessionCookie();

    if (token) {
      await logoutUser(token);
    }

    await clearSessionCookie();

    return NextResponse.json({
      success: true,

      message: "Logout successful.",
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,

        message: "Logout failed.",
      },
      {
        status: 500,
      },
    );
  }
}
