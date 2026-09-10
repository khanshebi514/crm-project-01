import prisma from "../lib/db/prisma.js";

async function main() {
  console.log("Creating SAI test products...");

  /*
    Replace this with your actual tenant id
  */

  const tenantId = "cmte9bwfb0001rgwb1ofr98gb";

  const products = [
    {
      name: "Sugar 1kg",
      sku: "SUGAR-1KG",
      barcode: "1000001",
      purchasePrice: 160,
      salePrice: 180,
      minimumStock: 10,
    },

    {
      name: "Cooking Oil 1L",
      sku: "OIL-1L",
      barcode: "1000002",
      purchasePrice: 500,
      salePrice: 550,
      minimumStock: 5,
    },

    {
      name: "Rice 5kg",
      sku: "RICE-5KG",
      barcode: "1000003",
      purchasePrice: 820,
      salePrice: 900,
      minimumStock: 5,
    },

    {
      name: "Milk Pack 1L",
      sku: "MILK-1L",
      barcode: "1000004",
      purchasePrice: 220,
      salePrice: 250,
      minimumStock: 10,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        tenantId,

        ...product,

        trackStock: true,

        isActive: true,
      },
    });
  }

  console.log("SAI test products created successfully");
}

main()
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
