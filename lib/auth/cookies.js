import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "sai_session";

const COOKIE_OPTIONS = {
  httpOnly: true,

  secure: process.env.NODE_ENV === "production",

  sameSite: "lax",

  path: "/",
};

export async function setSessionCookie(token) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    ...COOKIE_OPTIONS,

    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getSessionCookie() {
  const cookieStore = await cookies();

  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
}
