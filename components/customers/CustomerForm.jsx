"use client";

import { useState } from "react";

export default function CustomerForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    openingBalance: 0,
  });

  function update(field, value) {
    setForm({
      ...form,

      [field]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
      space-y-4
      rounded-lg
      border
      border-border
      bg-surface
      p-5
      "
    >
      <input
        placeholder="Customer name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        className="sai-input p-0.5 mr-0.5"
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        className="sai-input p-0.5"
      />

      <input
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="sai-input"
      />

      <input
        type="number"
        placeholder="Opening balance"
        value={form.openingBalance}
        onChange={(e) => update("openingBalance", e.target.value)}
        className="sai-input p-0.5"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="
          rounded-md
          bg-primary
          px-4
          py-2
          text-sm
          text-primary-foreground
          "
        >
          Save Customer
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="
            rounded-md
            border
            px-4
            py-2
            text-sm
            "
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
