"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/context/ToastProvider";

export default function CategoryForm() {
  const router = useRouter();

  const toast = useToast();

  const [name, setName] = useState("");

  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await fetch("/api/categories", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setName("");

      toast.success("Category created successfully");

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to create category");
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
      <h2 className="font-semibold">Add Category</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="
        w-full
        rounded-md
        border
        border-input-border
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
        text-sm
        text-primary-foreground
        "
      >
        {saving ? "Saving..." : "Add Category"}
      </button>
    </form>
  );
}
