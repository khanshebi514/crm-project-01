import { createSale } from "@/lib/sales/sale-service";

export async function saleSyncHandler(operation) {
  const payload =
    typeof operation.payload === "string"
      ? JSON.parse(operation.payload)
      : operation.payload;

  console.log("SERVER SALE SYNC HANDLER", payload);

  const sale = await createSale({
    tenantId: operation.tenantId,

    userId: operation.userId,

    customerId: payload.customerId ?? null,

    items: payload.items,

    discount: payload.discount ?? 0,

    tax: payload.tax ?? 0,

    paidAmount: payload.paidAmount ?? 0,

    paymentMethod: payload.paymentMethod ?? "CASH",
  });

  return {
    message: "Sale sync successful",

    saleId: sale.id,
  };
}
