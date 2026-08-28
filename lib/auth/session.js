import crypto from "crypto";

import prisma from "@/lib/db/prisma";

import {
  SessionExpiredError,
  SessionInvalidError,
} from "@/lib/auth/auth-errors";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateToken() {
  return crypto.randomBytes(48).toString("hex");
}

export async function createSession({ userId, activeTenantId = null }) {
  const token = generateToken();

  const tokenHash = hashToken(token);

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 30);

  await prisma.authSession.create({
    data: {
      userId,

      activeTenantId,

      tokenHash,

      expiresAt,
    },
  });

  return {
    token,
    expiresAt,
  };
}

export async function getSessionByToken(token) {
  if (!token) {
    throw new SessionInvalidError();
  }

  const tokenHash = hashToken(token);

  const session = await prisma.authSession.findUnique({
    where: {
      tokenHash,
    },

    include: {
      user: true,
    },
  });

  if (!session) {
    throw new SessionInvalidError();
  }

  if (session.revokedAt) {
    throw new SessionInvalidError();
  }

  if (session.expiresAt <= new Date()) {
    throw new SessionExpiredError();
  }

  if (!session.user || !session.user.isActive || session.user.deletedAt) {
    throw new SessionInvalidError();
  }

  await prisma.authSession.update({
    where: {
      id: session.id,
    },

    data: {
      lastSeenAt: new Date(),
    },
  });

  return session;
}

export async function revokeSession(token) {
  if (!token) {
    return;
  }

  const tokenHash = hashToken(token);

  await prisma.authSession.updateMany({
    where: {
      tokenHash,
    },

    data: {
      revokedAt: new Date(),
    },
  });
}

export async function revokeAllUserSessions(userId) {
  await prisma.authSession.updateMany({
    where: {
      userId,

      revokedAt: null,
    },

    data: {
      revokedAt: new Date(),
    },
  });
}
