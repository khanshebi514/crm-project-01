"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "../ui/Toast";

export default function CategoryEditModal({ category, open, onClose }) {
  const router = useRouter();

  const [name, setName] = useState(category.name);

  const [saving, setSaving] = useState(false);

  async function handleUpdate() {
    try {
      setSaving(true);

      const response = await fetch(`/api/categories/${category.id}`, {
        method: "PATCH",

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

      onClose();

      router.refresh();
    } catch (error) {
      Toast.error("UPDATE CATEGORY ERROR", error);
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-xl
        bg-surface
        p-6
        "
      >
        <h2 className="text-lg font-semibold">Edit Category</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
          mt-4
          w-full
          rounded-md
          border
          px-3
          py-2
          "
        />

        <div
          className="
          mt-5
          flex
          justify-end
          gap-3
          "
        >
          <button
            onClick={onClose}
            className="
            rounded-md
            border
            px-4
            py-2
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="
            rounded-md
            bg-primary
            px-4
            py-2
            text-primary-foreground
            "
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
