import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is missing. Add DATABASE_URL to your .env file before running the smoke test.",
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const testId = `${Date.now()}`;

const ids = {
  user: null,
  platformAdmin: null,
  platformAudit: null,

  plan: null,
  feature: null,
  planFeature: null,

  tenant: null,
  membership: null,
  businessSettings: null,

  subscription: null,
  subscriptionInvoice: null,
  subscriptionPayment: null,

  customer: null,
  supplier: null,
  category: null,
  product: null,

  sale: null,
  saleItem: null,
  payment: null,
  expense: null,
  stockMovement: null,
};

function logStep(message) {
  console.log(`\n▶ ${message}`);
}

function logSuccess(message) {
  console.log(`✓ ${message}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function createPlatformData() {
  logStep("Testing platform layer");

  const user = await prisma.user.create({
    data: {
      email: `sai-smoke-${testId}@example.com`,
      name: "SAI Smoke Test User",
      phone: `SMOKE-${testId}`,
    },
  });

  ids.user = user.id;

  assert(user.id, "User should have an ID");
  assert(
    user.email === `sai-smoke-${testId}@example.com`,
    "User email should match",
  );

  logSuccess("User created");

  const platformAdmin = await prisma.platformAdmin.create({
    data: {
      userId: user.id,
    },
  });

  ids.platformAdmin = platformAdmin.id;

  assert(
    platformAdmin.userId === user.id,
    "PlatformAdmin should reference User",
  );

  logSuccess("PlatformAdmin created");

  const platformAudit = await prisma.platformAudit.create({
    data: {
      platformAdminId: platformAdmin.id,
      action: "CREATE",
      entityType: "SmokeTest",
      entityId: testId,
      description: "Phase 3.02 database smoke test",
      metadata: {
        testId,
        source: "prisma-smoke-test",
      },
    },
  });

  ids.platformAudit = platformAudit.id;

  assert(
    platformAudit.platformAdminId === platformAdmin.id,
    "PlatformAudit should reference PlatformAdmin",
  );

  logSuccess("PlatformAudit created");

  const plan = await prisma.plan.create({
    data: {
      name: `Smoke Test Plan ${testId}`,
      code: `SMOKE_PLAN_${testId}`,
      description: "Temporary plan used by Phase 3.02 smoke test",
      billingInterval: "MONTHLY",
      price: "999.99",
    },
  });

  ids.plan = plan.id;

  assert(plan.id, "Plan should have an ID");

  logSuccess("Plan created");

  const feature = await prisma.feature.create({
    data: {
      key: `SMOKE_FEATURE_${testId}`,
      name: `Smoke Feature ${testId}`,
      description: "Temporary smoke-test feature",
    },
  });

  ids.feature = feature.id;

  logSuccess("Feature created");

  const planFeature = await prisma.planFeature.create({
    data: {
      planId: plan.id,
      featureId: feature.id,
      enabled: true,
    },
  });

  ids.planFeature = planFeature.id;

  assert(planFeature.planId === plan.id, "PlanFeature should reference Plan");

  assert(
    planFeature.featureId === feature.id,
    "PlanFeature should reference Feature",
  );

  logSuccess("PlanFeature created");
}

async function createTenantData() {
  logStep("Testing tenant / business layer");

  const tenant = await prisma.tenant.create({
    data: {
      name: `SAI Smoke Shop ${testId}`,
    },
  });

  ids.tenant = tenant.id;

  assert(tenant.id, "Tenant should have an ID");

  logSuccess("Tenant created");

  const membership = await prisma.membership.create({
    data: {
      userId: ids.user,
      tenantId: tenant.id,
      role: "OWNER",
      status: "ACTIVE",
    },
  });

  ids.membership = membership.id;

  assert(membership.userId === ids.user, "Membership should reference User");

  assert(
    membership.tenantId === tenant.id,
    "Membership should reference Tenant",
  );

  assert(membership.role === "OWNER", "Membership role should be OWNER");

  logSuccess("Membership created");

  const businessSettings = await prisma.businessSettings.create({
    data: {
      tenantId: tenant.id,
    },
  });

  ids.businessSettings = businessSettings.id;

  assert(
    businessSettings.tenantId === tenant.id,
    "BusinessSettings should reference Tenant",
  );

  logSuccess("BusinessSettings created");

  const subscription = await prisma.subscription.create({
    data: {
      tenantId: tenant.id,
      planId: ids.plan,
      status: "ACTIVE",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  ids.subscription = subscription.id;

  assert(
    subscription.tenantId === tenant.id,
    "Subscription should reference Tenant",
  );

  assert(
    subscription.planId === ids.plan,
    "Subscription should reference Plan",
  );

  logSuccess("Subscription created");

  const invoice = await prisma.subscriptionInvoice.create({
    data: {
      subscriptionId: subscription.id,
      invoiceNumber: `SMOKE-INV-${testId}`,
      status: "PARTIALLY_PAID",

      subtotal: "999.99",
      discount: "0.00",
      tax: "0.00",
      total: "999.99",

      amountPaid: "500.00",
      amountDue: "499.99",
    },
  });

  ids.subscriptionInvoice = invoice.id;

  assert(
    invoice.subscriptionId === subscription.id,
    "SubscriptionInvoice should reference Subscription",
  );

  logSuccess("SubscriptionInvoice created");

  const subscriptionPayment = await prisma.subscriptionPayment.create({
    data: {
      invoiceId: invoice.id,
      amount: "500.00",
      method: "CARD",
      status: "COMPLETED",
      reference: `SMOKE-SUB-PAY-${testId}`,
      paidAt: new Date(),
    },
  });

  ids.subscriptionPayment = subscriptionPayment.id;

  assert(
    subscriptionPayment.invoiceId === invoice.id,
    "SubscriptionPayment should reference invoice",
  );

  logSuccess("SubscriptionPayment created");
}

async function createShopData() {
  logStep("Testing shop operations layer");

  const customer = await prisma.customer.create({
    data: {
      tenantId: ids.tenant,
      name: `Smoke Customer ${testId}`,
      phone: `CUSTOMER-${testId}`,
      openingBalance: "250.00",
    },
  });

  ids.customer = customer.id;

  assert(customer.tenantId === ids.tenant, "Customer should belong to Tenant");

  logSuccess("Customer created");

  const supplier = await prisma.supplier.create({
    data: {
      tenantId: ids.tenant,
      name: `Smoke Supplier ${testId}`,
      phone: `SUPPLIER-${testId}`,
      openingBalance: "100.00",
    },
  });

  ids.supplier = supplier.id;

  assert(supplier.tenantId === ids.tenant, "Supplier should belong to Tenant");

  logSuccess("Supplier created");

  const category = await prisma.category.create({
    data: {
      tenantId: ids.tenant,
      name: `Smoke Category ${testId}`,
      description: "Temporary smoke-test category",
    },
  });

  ids.category = category.id;

  assert(category.tenantId === ids.tenant, "Category should belong to Tenant");

  logSuccess("Category created");

  const product = await prisma.product.create({
    data: {
      tenantId: ids.tenant,
      categoryId: category.id,

      name: `Smoke Product ${testId}`,
      sku: `SMOKE-SKU-${testId}`,
      barcode: `SMOKE-BARCODE-${testId}`,

      purchasePrice: "80.00",
      salePrice: "100.00",

      minimumStock: "5.000",

      trackStock: true,
    },
  });

  ids.product = product.id;

  assert(product.tenantId === ids.tenant, "Product should belong to Tenant");

  assert(
    product.categoryId === category.id,
    "Product should reference Category",
  );

  logSuccess("Product created");

  const sale = await prisma.sale.create({
    data: {
      tenantId: ids.tenant,
      customerId: customer.id,

      saleNumber: `SMOKE-SALE-${testId}`,

      status: "PARTIALLY_PAID",

      subtotal: "200.00",
      discount: "0.00",
      tax: "0.00",
      total: "200.00",

      paidAmount: "100.00",
      dueAmount: "100.00",

      notes: "Phase 3.02 smoke-test sale",

      soldAt: new Date(),
    },
  });

  ids.sale = sale.id;

  assert(sale.tenantId === ids.tenant, "Sale should belong to Tenant");

  assert(sale.customerId === customer.id, "Sale should reference Customer");

  logSuccess("Sale created");

  const saleItem = await prisma.saleItem.create({
    data: {
      tenantId: ids.tenant,
      saleId: sale.id,
      productId: product.id,

      quantity: "2.000",

      unitPrice: "100.00",
      discount: "0.00",

      lineTotal: "200.00",
    },
  });

  ids.saleItem = saleItem.id;

  assert(saleItem.saleId === sale.id, "SaleItem should reference Sale");

  assert(
    saleItem.productId === product.id,
    "SaleItem should reference Product",
  );

  assert(
    saleItem.unitPrice.toString() === "100",
    "SaleItem should preserve historical unit price",
  );

  logSuccess("SaleItem created");

  const payment = await prisma.payment.create({
    data: {
      tenantId: ids.tenant,
      saleId: sale.id,

      amount: "100.00",

      method: "CASH",
      status: "COMPLETED",

      reference: `SMOKE-PAYMENT-${testId}`,
      notes: "Partial smoke-test payment",

      paidAt: new Date(),
    },
  });

  ids.payment = payment.id;

  assert(payment.saleId === sale.id, "Payment should reference Sale");

  logSuccess("Payment created");

  const expense = await prisma.expense.create({
    data: {
      tenantId: ids.tenant,

      description: "Smoke Test Electricity Expense",

      amount: "50.00",

      status: "PAID",
      paymentMethod: "CASH",

      expenseDate: new Date(),

      notes: "Temporary Phase 3.02 smoke-test expense",
    },
  });

  ids.expense = expense.id;

  assert(expense.tenantId === ids.tenant, "Expense should belong to Tenant");

  logSuccess("Expense created");

  const stockMovement = await prisma.stockMovement.create({
    data: {
      tenantId: ids.tenant,
      productId: product.id,
      saleId: sale.id,

      type: "SALE",

      quantity: "2.000",

      unitCost: "80.00",

      reference: sale.saleNumber,
      notes: "Stock movement generated by smoke-test sale",

      occurredAt: new Date(),
    },
  });

  ids.stockMovement = stockMovement.id;

  assert(
    stockMovement.productId === product.id,
    "StockMovement should reference Product",
  );

  assert(
    stockMovement.saleId === sale.id,
    "StockMovement should reference Sale",
  );

  logSuccess("StockMovement created");
}

async function verifyRelations() {
  logStep("Verifying complete relational graph");

  const tenant = await prisma.tenant.findUnique({
    where: {
      id: ids.tenant,
    },

    include: {
      memberships: true,
      businessSettings: true,
      subscriptions: {
        include: {
          invoices: {
            include: {
              payments: true,
            },
          },
        },
      },
      customers: true,
      suppliers: true,
      categories: true,
      products: true,
      sales: {
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
          payments: true,
          stockMovements: true,
        },
      },
      payments: true,
      expenses: true,
      stockMovements: true,
    },
  });

  assert(tenant, "Tenant should exist");

  assert(
    tenant.memberships.length === 1,
    "Tenant should contain one smoke-test membership",
  );

  assert(
    tenant.businessSettings !== null,
    "Tenant should contain BusinessSettings",
  );

  assert(
    tenant.subscriptions.length === 1,
    "Tenant should contain one subscription",
  );

  assert(tenant.customers.length === 1, "Tenant should contain one customer");

  assert(tenant.suppliers.length === 1, "Tenant should contain one supplier");

  assert(tenant.categories.length === 1, "Tenant should contain one category");

  assert(tenant.products.length === 1, "Tenant should contain one product");

  assert(tenant.sales.length === 1, "Tenant should contain one sale");

  assert(
    tenant.payments.length === 1,
    "Tenant should contain one shop payment",
  );

  assert(tenant.expenses.length === 1, "Tenant should contain one expense");

  assert(
    tenant.stockMovements.length === 1,
    "Tenant should contain one stock movement",
  );

  const sale = tenant.sales[0];

  assert(sale.items.length === 1, "Sale should contain one SaleItem");

  assert(sale.payments.length === 1, "Sale should contain one Payment");

  assert(
    sale.stockMovements.length === 1,
    "Sale should contain one StockMovement",
  );

  assert(
    sale.customer?.id === ids.customer,
    "Sale should resolve its Customer relation",
  );

  assert(
    sale.items[0].product.id === ids.product,
    "SaleItem should resolve its Product relation",
  );

  const subscription = tenant.subscriptions[0];

  assert(
    subscription.invoices.length === 1,
    "Subscription should contain one invoice",
  );

  assert(
    subscription.invoices[0].payments.length === 1,
    "Invoice should contain one subscription payment",
  );

  logSuccess("All major relations verified");
}

async function verifyConstraints() {
  logStep("Testing important database constraints");

  let duplicateMembershipRejected = false;

  try {
    await prisma.membership.create({
      data: {
        userId: ids.user,
        tenantId: ids.tenant,
        role: "STAFF",
        status: "ACTIVE",
      },
    });
  } catch {
    duplicateMembershipRejected = true;
  }

  assert(
    duplicateMembershipRejected,
    "Database must reject duplicate User + Tenant membership",
  );

  logSuccess("Duplicate membership correctly rejected");

  let duplicateSkuRejected = false;

  try {
    await prisma.product.create({
      data: {
        tenantId: ids.tenant,
        name: `Duplicate SKU Product ${testId}`,
        sku: `SMOKE-SKU-${testId}`,
        salePrice: "100.00",
      },
    });
  } catch {
    duplicateSkuRejected = true;
  }

  assert(
    duplicateSkuRejected,
    "Database must reject duplicate SKU within the same tenant",
  );

  logSuccess("Duplicate tenant SKU correctly rejected");

  let duplicateSaleNumberRejected = false;

  try {
    await prisma.sale.create({
      data: {
        tenantId: ids.tenant,
        saleNumber: `SMOKE-SALE-${testId}`,
      },
    });
  } catch {
    duplicateSaleNumberRejected = true;
  }

  assert(
    duplicateSaleNumberRejected,
    "Database must reject duplicate sale number within the tenant",
  );

  logSuccess("Duplicate tenant sale number correctly rejected");
}

async function cleanup() {
  logStep("Cleaning smoke-test data");

  /*
    Delete in reverse dependency order.

    This also indirectly confirms that our RESTRICT relationships
    are behaving as expected.
  */

  if (ids.stockMovement) {
    await prisma.stockMovement.delete({
      where: {
        id: ids.stockMovement,
      },
    });
  }

  if (ids.payment) {
    await prisma.payment.delete({
      where: {
        id: ids.payment,
      },
    });
  }

  if (ids.saleItem) {
    await prisma.saleItem.delete({
      where: {
        id: ids.saleItem,
      },
    });
  }

  if (ids.sale) {
    await prisma.sale.delete({
      where: {
        id: ids.sale,
      },
    });
  }

  if (ids.expense) {
    await prisma.expense.delete({
      where: {
        id: ids.expense,
      },
    });
  }

  if (ids.product) {
    await prisma.product.delete({
      where: {
        id: ids.product,
      },
    });
  }

  if (ids.category) {
    await prisma.category.delete({
      where: {
        id: ids.category,
      },
    });
  }

  if (ids.customer) {
    await prisma.customer.delete({
      where: {
        id: ids.customer,
      },
    });
  }

  if (ids.supplier) {
    await prisma.supplier.delete({
      where: {
        id: ids.supplier,
      },
    });
  }

  if (ids.subscriptionPayment) {
    await prisma.subscriptionPayment.delete({
      where: {
        id: ids.subscriptionPayment,
      },
    });
  }

  if (ids.subscriptionInvoice) {
    await prisma.subscriptionInvoice.delete({
      where: {
        id: ids.subscriptionInvoice,
      },
    });
  }

  if (ids.subscription) {
    await prisma.subscription.delete({
      where: {
        id: ids.subscription,
      },
    });
  }

  if (ids.businessSettings) {
    await prisma.businessSettings.delete({
      where: {
        id: ids.businessSettings,
      },
    });
  }

  if (ids.membership) {
    await prisma.membership.delete({
      where: {
        id: ids.membership,
      },
    });
  }

  if (ids.tenant) {
    await prisma.tenant.delete({
      where: {
        id: ids.tenant,
      },
    });
  }

  if (ids.planFeature) {
    await prisma.planFeature.delete({
      where: {
        id: ids.planFeature,
      },
    });
  }

  if (ids.feature) {
    await prisma.feature.delete({
      where: {
        id: ids.feature,
      },
    });
  }

  if (ids.plan) {
    await prisma.plan.delete({
      where: {
        id: ids.plan,
      },
    });
  }

  if (ids.platformAudit) {
    await prisma.platformAudit.delete({
      where: {
        id: ids.platformAudit,
      },
    });
  }

  if (ids.platformAdmin) {
    await prisma.platformAdmin.delete({
      where: {
        id: ids.platformAdmin,
      },
    });
  }

  if (ids.user) {
    await prisma.user.delete({
      where: {
        id: ids.user,
      },
    });
  }

  logSuccess("Smoke-test records removed");
}

async function main() {
  console.log("");
  console.log("================================================");
  console.log(" SAI — PHASE 3.02 DATABASE SMOKE TEST");
  console.log("================================================");
  console.log(`Test ID: ${testId}`);

  try {
    await createPlatformData();

    await createTenantData();

    await createShopData();

    await verifyRelations();

    await verifyConstraints();

    console.log("");
    console.log("================================================");
    console.log(" ✅ SAI DATABASE SMOKE TEST PASSED");
    console.log("================================================");
    console.log("");
    console.log("Verified:");
    console.log("✓ Prisma Client connection");
    console.log("✓ Platform models");
    console.log("✓ Tenant models");
    console.log("✓ Shop models");
    console.log("✓ Foreign-key relations");
    console.log("✓ Decimal financial values");
    console.log("✓ Historical SaleItem pricing");
    console.log("✓ Subscription relationships");
    console.log("✓ Sale relationships");
    console.log("✓ StockMovement relationships");
    console.log("✓ Tenant-aware membership uniqueness");
    console.log("✓ Tenant-aware SKU uniqueness");
    console.log("✓ Tenant-aware sale-number uniqueness");
    console.log("");
  } catch (error) {
    console.error("");
    console.error("================================================");
    console.error(" ❌ SAI DATABASE SMOKE TEST FAILED");
    console.error("================================================");
    console.error("");

    console.error(error);

    process.exitCode = 1;
  } finally {
    try {
      await cleanup();
    } catch (cleanupError) {
      console.error("");
      console.error("⚠ Smoke-test cleanup failed.");
      console.error(cleanupError);

      process.exitCode = 1;
    }

    await prisma.$disconnect();
  }
}

main();
