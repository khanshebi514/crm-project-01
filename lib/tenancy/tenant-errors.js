export class SaiSecurityError extends Error {
  constructor(message, code = "SECURITY_ERROR", status = 403) {
    super(message);

    this.name = "SaiSecurityError";
    this.code = code;
    this.status = status;
  }
}

export class AuthenticationRequiredError extends SaiSecurityError {
  constructor(message = "Authentication is required.") {
    super(message, "AUTHENTICATION_REQUIRED", 401);

    this.name = "AuthenticationRequiredError";
  }
}

export class MembershipRequiredError extends SaiSecurityError {
  constructor(message = "You do not have access to this business.") {
    super(message, "MEMBERSHIP_REQUIRED", 403);

    this.name = "MembershipRequiredError";
  }
}

export class MembershipInactiveError extends SaiSecurityError {
  constructor(message = "Your business membership is not active.") {
    super(message, "MEMBERSHIP_INACTIVE", 403);

    this.name = "MembershipInactiveError";
  }
}

export class TenantUnavailableError extends SaiSecurityError {
  constructor(message = "This business is currently unavailable.") {
    super(message, "TENANT_UNAVAILABLE", 403);

    this.name = "TenantUnavailableError";
  }
}

export class SubscriptionRequiredError extends SaiSecurityError {
  constructor(message = "An active subscription is required.") {
    super(message, "SUBSCRIPTION_REQUIRED", 403);

    this.name = "SubscriptionRequiredError";
  }
}

export class SubscriptionExpiredError extends SaiSecurityError {
  constructor(message = "The business subscription has expired.") {
    super(message, "SUBSCRIPTION_EXPIRED", 403);

    this.name = "SubscriptionExpiredError";
  }
}

export class FeatureUnavailableError extends SaiSecurityError {
  constructor(featureKey) {
    super(
      `The feature "${featureKey}" is not available for this business.`,
      "FEATURE_UNAVAILABLE",
      403,
    );

    this.name = "FeatureUnavailableError";
    this.featureKey = featureKey;
  }
}

export class PermissionDeniedError extends SaiSecurityError {
  constructor(permission) {
    super(
      `You do not have permission to perform "${permission}".`,
      "PERMISSION_DENIED",
      403,
    );

    this.name = "PermissionDeniedError";
    this.permission = permission;
  }
}

export class TenantRecordNotFoundError extends SaiSecurityError {
  constructor(resource = "Record") {
    super(`${resource} was not found.`, "TENANT_RECORD_NOT_FOUND", 404);

    this.name = "TenantRecordNotFoundError";
  }
}

export class CrossTenantAccessError extends SaiSecurityError {
  constructor(message = "Cross-tenant access is not allowed.") {
    super(message, "CROSS_TENANT_ACCESS", 403);

    this.name = "CrossTenantAccessError";
  }
}
