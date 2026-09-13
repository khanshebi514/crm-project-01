"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/context/ToastProvider";

export default function UnitForm() {
  const router = useRouter();

  const toast = useToast();

  const [name, setName] = useState("");

  const [shortCode, setShortCode] = useState("");

  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch("/api/units", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,

          shortCode,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setName("");

      setShortCode("");

      toast.success("Unit created successfully");

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to create unit");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
rounded-xl
border
border-border
bg-surface
p-6
space-y-4
"
    >
      <h2 className="font-semibold">Add Unit</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Unit name e.g Kilogram"
        className="
w-full
rounded-md
border
px-3
py-2
"
      />

      <input
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        placeholder="Short code e.g KG"
        className="
w-full
rounded-md
border
px-3
py-2
"
      />

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
        {saving ? "Saving..." : "Add Unit"}
      </button>
    </form>
  );
}
