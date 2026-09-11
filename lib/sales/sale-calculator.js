export function calculateSaleTotals({
  items = [],
  discount = 0,
  tax = 0,
  paidAmount = 0,
}) {
  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.unitPrice || 0) * Number(item.quantity || 0);
  }, 0);

  const discountAmount = Number(discount || 0);

  const taxAmount = Number(tax || 0);

  const total = Math.max(subtotal - discountAmount + taxAmount, 0);

  const paid = Number(paidAmount || 0);

  const dueAmount = Math.max(total - paid, 0);

  return {
    subtotal,

    discount: discountAmount,

    tax: taxAmount,

    total,

    paidAmount: paid,

    dueAmount,
  };
}
