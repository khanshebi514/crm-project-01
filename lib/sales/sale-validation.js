export function validateSaleInput({
  items,
  discount = 0,
  tax = 0,
  paidAmount = 0,
}) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Sale must contain at least one item");
  }

  for (const item of items) {
    if (!item.productId) {
      throw new Error("Product ID is required");
    }

    if (!item.quantity || Number(item.quantity) <= 0) {
      throw new Error("Invalid product quantity");
    }

    if (item.unitPrice === undefined || Number(item.unitPrice) < 0) {
      throw new Error("Invalid product price");
    }
  }

  if (Number(discount) < 0) {
    throw new Error("Discount cannot be negative");
  }

  if (Number(tax) < 0) {
    throw new Error("Tax cannot be negative");
  }

  if (Number(paidAmount) < 0) {
    throw new Error("Paid amount cannot be negative");
  }

  return true;
}
