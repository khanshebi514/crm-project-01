export function validatePaymentInput({ amount }) {
  if (!amount) {
    throw new Error("Payment amount is required");
  }

  if (Number(amount) <= 0) {
    throw new Error("Payment amount must be greater than zero");
  }
}
