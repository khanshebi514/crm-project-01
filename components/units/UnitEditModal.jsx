"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useToast } from "@/context/ToastProvider";

import Modal from "@/components/ui/Modal";

export default function UnitEditModal({ unit }) {
  const router = useRouter();

  const toast = useToast();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(unit.name);

  const [shortCode, setShortCode] = useState(unit.shortCode);

  const [saving, setSaving] = useState(false);

  async function handleUpdate() {
    try {
      setSaving(true);

      const response = await fetch(`/api/units/${unit.id}`, {
        method: "PATCH",

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

      toast.success("Unit updated successfully");

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
rounded-md
border
px-3
py-1
text-sm
"
      >
        Edit
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Unit"
        footer={
          <button
            disabled={saving}
            onClick={handleUpdate}
            className="
rounded-md
bg-primary
px-4
py-2
text-white
"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        }
      >
        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            className="
w-full
rounded-md
border
px-3
py-2
"
          />
        </div>
      </Modal>
    </>
  );
}
