import prisma from "@/lib/db/prisma";

import { hashPassword, verifyPassword } from "@/lib/auth/password";

import {
  createSession,
  getSessionByToken,
  revokeSession,
} from "@/lib/auth/session";

import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
  UserInactiveError,
} from "@/lib/auth/auth-errors";

export async function registerUser({ name, email, password, tenantName }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const passwordHash = await hashPassword(password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,

        email: normalizedEmail,

        passwordHash,
      },
    });

    const tenant = await tx.tenant.create({
      data: {
        name: tenantName,
      },
    });

    await tx.membership.create({
      data: {
        userId: user.id,

        tenantId: tenant.id,

        role: "OWNER",

        status: "ACTIVE",
      },
    });

    await tx.businessSettings.create({
      data: {
        tenantId: tenant.id,
      },
    });
    const defaultPlan = await tx.plan.findFirst({
      where: {
        isDefault: true,
        isActive: true,
        deletedAt: null,
      },
    });

    if (!defaultPlan) {
      throw new Error("No default onboarding plan configured.");
    }

    const trialEndsAt = new Date();

    trialEndsAt.setDate(trialEndsAt.getDate() + defaultPlan.trialDays);

    const subscription = await tx.subscription.create({
      data: {
        tenantId: tenant.id,

        planId: defaultPlan.id,

        status: "TRIALING",

        startedAt: new Date(),

        trialEndsAt,

        currentPeriodStart: new Date(),

        currentPeriodEnd: trialEndsAt,
      },
    });
    return {
      user,
      tenant,
      subscription,
    };
  });
}

export async function authenticateUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },

    include: {
      memberships: {
        where: {
          status: "ACTIVE",
        },
      },
    },
  });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  if (!user.isActive) {
    throw new UserInactiveError();
  }

  const valid = await verifyPassword(password, user.passwordHash);

  if (!valid) {
    throw new InvalidCredentialsError();
  }

  const activeMembership = user.memberships[0];

  const session = await createSession({
    userId: user.id,

    activeTenantId: activeMembership?.tenantId ?? null,
  });

  return {
    user,

    session,
  };
}

export async function logoutUser(token) {
  await revokeSession(token);

  return true;
}

export async function resolveSession(token) {
  return getSessionByToken(token);
}
