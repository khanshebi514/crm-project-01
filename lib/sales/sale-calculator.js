export function calculateSaleTotals({
  cart = [],
  discount = 0,
  taxRate = 0,
  receivedAmount = 0,
}) {
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.salePrice || item.unitPrice || 0) *
        Number(item.quantity || 0),
    0,
  );

  const discountAmount = Number(discount || 0);

  const discountedTotal = Math.max(subtotal - discountAmount, 0);

  const taxAmount = (discountedTotal * Number(taxRate || 0)) / 100;

  const total = discountedTotal + taxAmount;

  const paidAmount = Number(receivedAmount || 0);

  const remaining = Math.max(total - paidAmount, 0);

  return {
    // UI compatibility

    subtotal,

    discountAmount,

    taxAmount,

    total,

    remaining,

    // Backend compatibility

    discount: discountAmount,

    tax: taxAmount,

    paidAmount,

    dueAmount: remaining,
  };
}
