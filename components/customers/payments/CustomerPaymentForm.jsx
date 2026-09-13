"use client";

import { useState } from "react";

export default function CustomerPaymentForm({ customerId, onSuccess }) {
  const [amount, setAmount] = useState("");

  const [method, setMethod] = useState("CASH");

  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(`/api/customers/${customerId}/payments`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: Number(amount),

          method,

          notes,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      onSuccess();

      window.location.reload();
    } catch (error) {
      console.error("PAYMENT ERROR", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm">Amount</label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="
mt-2
w-full
rounded-md
border
border-input-border
px-3
py-2
"
        />
      </div>

      <div>
        <label className="text-sm">Payment Method</label>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="
mt-2
w-full
rounded-md
border
px-3
py-2
"
        >
          <option value="CASH">Cash</option>

          <option value="BANK">Bank</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Notes</label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="
mt-2
w-full
rounded-md
border
px-3
py-2
"
        />
      </div>

      <button
        disabled={saving}
        className="
rounded-md
bg-primary
px-4
py-2
text-primary-foreground
"
      >
        {saving ? "Saving..." : "Save Payment"}
      </button>
    </form>
  );
}
