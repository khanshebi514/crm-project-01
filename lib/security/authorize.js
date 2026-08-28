import { resolveTenantContext } from "@/lib/tenancy/tenant-context";

import { requireTenantAccess } from "@/lib/tenancy/tenant-guard";

/**
 * Main SAI tenant authorization entry point.
 *
 * authenticatedUserId and activeTenantId MUST come from trusted
 * server-side session/authentication state.
 *
 * Example future usage:
 *
 * const context = await authorize({
 *   authenticatedUserId: session.user.id,
 *   activeTenantId: session.activeTenantId,
 *   permission: PERMISSIONS.SALE_CREATE,
 *   feature: "SALES",
 * });
 */
export async function authorize({
  authenticatedUserId,
  activeTenantId,
  permission = null,
  feature = null,
}) {
  const context = await resolveTenantContext({
    authenticatedUserId,
    activeTenantId,
  });

  requireTenantAccess(context, {
    permission,
    feature,
  });

  return context;
}
