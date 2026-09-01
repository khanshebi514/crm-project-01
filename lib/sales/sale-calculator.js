export function calculateSaleTotals({
  items,
  discount = 0,
  tax = 0,
  paidAmount = 0,
}) {
  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity);

    const unitPrice = Number(item.unitPrice);

    return sum + quantity * unitPrice;
  }, 0);

  const total = subtotal - Number(discount) + Number(tax);

  const dueAmount = total - Number(paidAmount);

  return {
    subtotal,

    discount: Number(discount),

    tax: Number(tax),

    total,

    paidAmount: Number(paidAmount),

    dueAmount,
  };
}
