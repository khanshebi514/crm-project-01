import prisma from "@/lib/db/prisma";

import { processSyncOperation } from "@/lib/sync/sync-service";

export async function POST() {
  let tenant;
  let user;
  let record;

  try {
    console.log("================================================");

    console.log("SAI API SYNC TEST");

    console.log("================================================");

    const testId = Date.now();

    // Create Tenant

    tenant = await prisma.tenant.create({
      data: {
        name: `API Sync Test ${testId}`,
      },
    });

    // Create User

    user = await prisma.user.create({
      data: {
        email: `api-sync-${testId}@test.com`,

        passwordHash: "test-password",
      },
    });

    // Create Membership

    await prisma.membership.create({
      data: {
        tenantId: tenant.id,

        userId: user.id,

        role: "OWNER",
      },
    });

    console.log("✓ Test environment created");

    const operationId = `api-sync-test-${testId}`;

    const result = await processSyncOperation({
      operationId,

      tenantId: tenant.id,

      userId: user.id,

      entity: "TEST_ENTITY",

      operation: "CREATE",

      payload: {
        message: "Hello API Sync",
      },
    });

    record = await prisma.syncOperation.findUnique({
      where: {
        operationId,
      },
    });

    if (!record) {
      throw new Error("Sync record not created");
    }

    if (record.status !== "SYNCED") {
      throw new Error(`Expected SYNCED got ${record.status}`);
    }

    console.log("✓ API Sync passed");

    return Response.json({
      success: true,

      result,

      record,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,

        message: error.message,
      },

      {
        status: 500,
      },
    );
  } finally {
    if (record) {
      await prisma.syncOperation.delete({
        where: {
          id: record.id,
        },
      });
    }

    if (user) {
      await prisma.membership.deleteMany({
        where: {
          userId: user.id,
        },
      });

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    }

    if (tenant) {
      await prisma.tenant.delete({
        where: {
          id: tenant.id,
        },
      });
    }
  }
}
