"use client";

import Select from "@/components/ui/Select";

export default function PaymentPanel({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="space-y-3">
      <h3>Payment</h3>

      <Select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="CASH">Cash</option>

        <option value="CARD">Card</option>

        <option value="BANK_TRANSFER">Bank Transfer</option>

        <option value="CREDIT">Credit</option>
      </Select>
    </div>
  );
}
