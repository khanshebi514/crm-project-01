import prisma from "@/lib/db/prisma";

export async function POST() {
  const testId = Date.now();

  try {
    const tenant = await prisma.tenant.create({
      data: {
        name: `Offline Test ${testId}`,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: `offline-test-${testId}@test.com`,

        passwordHash: "test-password",
      },
    });

    await prisma.membership.create({
      data: {
        tenantId: tenant.id,

        userId: user.id,

        role: "OWNER",
      },
    });

    return Response.json({
      success: true,

      tenantId: tenant.id,

      userId: user.id,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,

        message: error.message,
      },

      {
        status: 500,
      },
    );
  }
}
