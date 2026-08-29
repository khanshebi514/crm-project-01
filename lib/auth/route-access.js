import prisma from "@/lib/db/prisma";

import { getSessionByToken } from "@/lib/auth/session";

import { AuthenticationRequiredError, AuthError } from "@/lib/auth/auth-errors";

export async function getAuthenticatedContext(token) {
  if (!token) {
    throw new AuthenticationRequiredError();
  }

  const session = await getSessionByToken(token);

  const user = await prisma.user.findUnique({
    where: {
      id: session.userId,
    },

    include: {
      platformAdmin: true,

      memberships: {
        where: {
          status: "ACTIVE",
        },

        include: {
          tenant: true,
        },
      },
    },
  });

  if (!user) {
    throw new AuthenticationRequiredError();
  }

  return {
    user,

    session,

    activeTenantId: session.activeTenantId,
  };
}

export async function isPlatformAdmin(userId) {
  const admin = await prisma.platformAdmin.findUnique({
    where: {
      userId,
    },
  });

  return Boolean(admin && admin.isActive);
}

export async function requireAdmin(token) {
  const context = await getAuthenticatedContext(token);

  const admin = await isPlatformAdmin(context.user.id);

  if (!admin) {
    throw new AuthError("Admin access required.", "ADMIN_ACCESS_REQUIRED", 403);
  }

  return context;
}

export async function requireBusinessUser(token) {
  const context = await getAuthenticatedContext(token);

  const hasBusinessAccess = context.user.memberships.some(
    (membership) => membership.status === "ACTIVE",
  );

  if (!hasBusinessAccess) {
    throw new AuthError(
      "Business access required.",
      "BUSINESS_ACCESS_REQUIRED",
      403,
    );
  }

  return context;
}

export async function getUserDestination(token) {
  const context = await getAuthenticatedContext(token);

  const admin = await isPlatformAdmin(context.user.id);

  if (admin) {
    return "/admin";
  }

  return "/dashboard";
}
