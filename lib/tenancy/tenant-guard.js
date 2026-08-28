import {
  AuthenticationRequiredError,
  FeatureUnavailableError,
  MembershipInactiveError,
  MembershipRequiredError,
  PermissionDeniedError,
  SubscriptionExpiredError,
  TenantUnavailableError,
} from "@/lib/tenancy/tenant-errors";

import { roleHasPermission } from "@/lib/security/permissions";

import { tenantHasFeature } from "@/lib/security/features";

export function requireTenantContext(context) {
  if (!context) {
    throw new AuthenticationRequiredError();
  }

  if (!context.userId) {
    throw new AuthenticationRequiredError();
  }

  if (!context.tenantId) {
    throw new MembershipRequiredError();
  }

  if (context.membershipStatus !== "ACTIVE") {
    throw new MembershipInactiveError();
  }

  if (!context.tenant?.isActive) {
    throw new TenantUnavailableError();
  }

  if (!context.subscription) {
    throw new SubscriptionExpiredError();
  }

  return context;
}

export function requirePermission(context, permission) {
  requireTenantContext(context);

  if (!roleHasPermission(context.role, permission)) {
    throw new PermissionDeniedError(permission);
  }

  return context;
}

export function requireFeature(context, featureKey) {
  requireTenantContext(context);

  if (!tenantHasFeature(context, featureKey)) {
    throw new FeatureUnavailableError(featureKey);
  }

  return context;
}

export function requireTenantAccess(
  context,
  { permission = null, feature = null } = {},
) {
  requireTenantContext(context);

  if (feature) {
    requireFeature(context, feature);
  }

  if (permission) {
    requirePermission(context, permission);
  }

  return context;
}
