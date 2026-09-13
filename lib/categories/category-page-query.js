import { getSessionCookie } from "@/lib/auth/cookies";

import { resolveSession } from "@/lib/auth/auth";

import { authorize } from "@/lib/security/authorize";

import { PERMISSIONS } from "@/lib/security/permissions";

import { getCategories } from "./category-query";

export async function getCategoriesServer() {
  const token = await getSessionCookie();

  const session = await resolveSession(token);

  const context = await authorize({
    authenticatedUserId: session.user.id,

    activeTenantId: session.activeTenantId,

    permission: PERMISSIONS.CATEGORY_VIEW,
  });

  return await getCategories(context.tenantId);
}
