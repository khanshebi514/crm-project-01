import prisma from "@/lib/db/prisma";

export async function findExistingProduct({ tenantId, name, barcode }) {
  const product = await prisma.product.findFirst({
    where: {
      tenantId,

      deletedAt: null,

      AND: [
        {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },

        {
          barcode,
        },
      ],
    },
  });

  return product;
}
