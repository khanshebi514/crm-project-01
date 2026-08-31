import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

export async function requireAuth() {
  const token = await getSessionCookie();

  if (!token) {
    throw new Error("Authentication required");
  }

  const session = await resolveSession(token);

  if (!session.activeTenantId) {
    throw new Error("Active tenant required");
  }

  return session;
}
