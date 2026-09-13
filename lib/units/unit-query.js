import prisma from "@/lib/db/prisma";

export async function getUnits(tenantId) {
  return await prisma.unit.findMany({
    where: {
      tenantId,

      isActive: true,
    },

    orderBy: {
      name: "asc",
    },
  });
}
