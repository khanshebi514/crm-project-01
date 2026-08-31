import prisma from "@/lib/db/prisma";

import { routeSyncOperation } from "./sync-router";

export async function processSyncOperation({
  operationId,

  tenantId,

  userId,

  entity,

  operation,

  payload,
}) {
  if (!operationId || !tenantId || !userId || !entity || !operation) {
    throw new Error("Invalid sync operation payload");
  }
  const existing = await prisma.syncOperation.findUnique({
    where: {
      operationId,
    },
  });

  if (existing) {
    return {
      success: true,

      status: existing.status,

      response: existing.response,
    };
  }

  const syncRecord = await prisma.syncOperation.create({
    data: {
      operationId,

      tenantId,

      userId,

      entity,

      operation,

      status: "PROCESSING",
    },
  });

  try {
    const result = await routeSyncOperation({
      entity,

      operation,

      payload,

      tenantId,

      userId,
    });

    await prisma.syncOperation.update({
      where: {
        id: syncRecord.id,
      },

      data: {
        status: "SYNCED",

        response: result,
      },
    });

    return {
      success: true,

      status: "SYNCED",

      result,
    };
  } catch (error) {
    try {
      await prisma.syncOperation.update({
        where: {
          id: syncRecord.id,
        },

        data: {
          status: "FAILED",

          response: {
            message: error.message,
          },
        },
      });
    } catch (updateError) {
      console.error("Failed updating sync status", updateError);
    }

    throw error;
  }
}
