import prisma from "@/lib/db/prisma";

import {
  AuthenticationRequiredError,
  MembershipInactiveError,
  MembershipRequiredError,
  SubscriptionExpiredError,
  SubscriptionRequiredError,
  TenantUnavailableError,
} from "@/lib/tenancy/tenant-errors";

import { getPermissionsForRole } from "@/lib/security/permissions";

const VALID_SUBSCRIPTION_STATUSES = new Set(["ACTIVE", "TRIALING"]);

function isSubscriptionTimeValid(subscription, now = new Date()) {
  if (!subscription) {
    return false;
  }

  if (!VALID_SUBSCRIPTION_STATUSES.has(subscription.status)) {
    return false;
  }

  if (
    subscription.status === "TRIALING" &&
    subscription.trialEndsAt &&
    subscription.trialEndsAt <= now
  ) {
    return false;
  }

  if (subscription.currentPeriodEnd && subscription.currentPeriodEnd <= now) {
    return false;
  }

  return true;
}

function buildFeatureList(subscription) {
  if (!subscription?.plan?.planFeatures) {
    return [];
  }

  return subscription.plan.planFeatures
    .filter(
      (planFeature) =>
        planFeature.enabled === true && planFeature.feature?.isActive === true,
    )
    .map((planFeature) => ({
      id: planFeature.feature.id,
      key: planFeature.feature.key,
      name: planFeature.feature.name,
      enabled: true,
    }));
}

/**
 * Resolves the trusted SAI tenant security context.
 *
 * IMPORTANT:
 *
 * authenticatedUserId and activeTenantId must come from trusted
 * server-side authentication/session state.
 *
 * Do NOT pass raw browser request values directly into this
 * function without first verifying them through the authentication
 * layer.
 */
export async function resolveTenantContext({
  authenticatedUserId,
  activeTenantId,
}) {
  if (!authenticatedUserId) {
    throw new AuthenticationRequiredError();
  }

  if (!activeTenantId) {
    throw new MembershipRequiredError("No active business has been selected.");
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId: authenticatedUserId,
      tenantId: activeTenantId,
    },

    include: {
      user: true,

      tenant: {
        include: {
          subscriptions: {
            where: {
              status: {
                in: ["ACTIVE", "TRIALING"],
              },
            },

            orderBy: {
              createdAt: "desc",
            },

            include: {
              plan: {
                include: {
                  planFeatures: {
                    include: {
                      feature: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!membership) {
    throw new MembershipRequiredError();
  }

  if (!membership.user?.isActive || membership.user?.deletedAt) {
    throw new AuthenticationRequiredError("This user account is not active.");
  }

  if (membership.status !== "ACTIVE") {
    throw new MembershipInactiveError();
  }

  const tenant = membership.tenant;

  if (!tenant || !tenant.isActive || tenant.deletedAt) {
    throw new TenantUnavailableError();
  }

  const subscription =
    tenant.subscriptions.find((item) => isSubscriptionTimeValid(item)) ?? null;

  if (!subscription) {
    const latestCandidate = tenant.subscriptions[0] ?? null;

    if (latestCandidate) {
      throw new SubscriptionExpiredError();
    }

    throw new SubscriptionRequiredError();
  }

  const features = buildFeatureList(subscription);

  return Object.freeze({
    userId: membership.userId,

    tenantId: membership.tenantId,

    membershipId: membership.id,

    role: membership.role,

    membershipStatus: membership.status,

    tenant: Object.freeze({
      id: tenant.id,
      name: tenant.name,
      isActive: tenant.isActive,
    }),

    subscription: Object.freeze({
      id: subscription.id,
      status: subscription.status,
      planId: subscription.planId,
      planCode: subscription.plan.code,
      planName: subscription.plan.name,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      trialEndsAt: subscription.trialEndsAt,
    }),

    features: Object.freeze(features),

    permissions: Object.freeze(getPermissionsForRole(membership.role)),
  });
}
