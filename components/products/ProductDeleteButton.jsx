"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/context/ToastProvider";

import Modal from "@/components/ui/Modal";

export default function ProductDeleteButton({ productId }) {
  const router = useRouter();

  const toast = useToast();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Product deleted successfully");

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
      rounded-md
      border
      border-red-500
      px-3
      py-1
      text-sm
      text-red-600
      "
      >
        Delete
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        footer={
          <>
            <button
              onClick={() => setOpen(false)}
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
              disabled={loading}
              onClick={handleDelete}
              className="
      rounded-md
      bg-red-600
      px-4
      py-2
      text-white
      "
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      />
    </>
  );
}
