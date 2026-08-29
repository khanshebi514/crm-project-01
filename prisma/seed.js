import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("================================================");

  console.log("SAI — PERMISSION SEED STARTED");

  console.log("================================================");

  const permissions = [
    // Product
    {
      key: "product.create",
      description: "Create products",
    },

    {
      key: "product.view",
      description: "View products",
    },

    {
      key: "product.update",
      description: "Update products",
    },

    {
      key: "product.delete",
      description: "Delete products",
    },

    // Sales

    {
      key: "sale.create",
      description: "Create sales",
    },

    {
      key: "sale.view",
      description: "View sales",
    },

    {
      key: "sale.update",
      description: "Update sales",
    },

    {
      key: "sale.refund",
      description: "Refund sales",
    },

    // Customers

    {
      key: "customer.create",
      description: "Create customers",
    },

    {
      key: "customer.view",
      description: "View customers",
    },

    {
      key: "customer.update",
      description: "Update customers",
    },

    {
      key: "customer.delete",
      description: "Delete customers",
    },

    // Inventory

    {
      key: "inventory.view",
      description: "View inventory",
    },

    {
      key: "inventory.adjust",
      description: "Adjust inventory",
    },

    // Reports

    {
      key: "report.view",
      description: "View reports",
    },

    // Users

    {
      key: "user.invite",
      description: "Invite users",
    },

    {
      key: "user.update",
      description: "Update users",
    },

    {
      key: "user.remove",
      description: "Remove users",
    },
  ];

  const createdPermissions = {};

  for (const permission of permissions) {
    const record = await prisma.permission.upsert({
      where: {
        key: permission.key,
      },

      update: {},

      create: permission,
    });

    createdPermissions[permission.key] = record.id;
  }

  console.log("✓ Permissions created");

  /*
    Role mappings
  */

  const roles = {
    OWNER: Object.keys(createdPermissions),

    MANAGER: [
      "product.create",
      "product.view",
      "product.update",

      "sale.create",
      "sale.view",
      "sale.update",

      "customer.create",
      "customer.view",
      "customer.update",

      "inventory.view",
      "inventory.adjust",

      "report.view",
    ],

    CASHIER: ["sale.create", "sale.view", "customer.view"],

    STAFF: ["product.view", "customer.view"],
  };

  for (const roleName of Object.keys(roles)) {
    for (const permissionKey of roles[roleName]) {
      await prisma.rolePermission.upsert({
        where: {
          role_permissionId: {
            role: roleName,

            permissionId: createdPermissions[permissionKey],
          },
        },

        update: {},

        create: {
          role: roleName,

          permissionId: createdPermissions[permissionKey],
        },
      });
    }
  }

  console.log("✓ Role permissions mapped");

  console.log("================================================");

  console.log("✅ SAI PERMISSION SEED COMPLETED");

  console.log("================================================");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
