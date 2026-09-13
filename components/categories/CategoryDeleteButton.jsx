"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/ui/ConfirmModal";

import { useToast } from "@/context/ToastProvider";

export default function CategoryDeleteButton({ categoryId }) {
  const router = useRouter();

  const toast = useToast();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("Category deleted successfully");

      setOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
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

      <ConfirmModal
        open={open}
        title="Delete Category"
        description="
        Are you sure you want to delete this category?
        This action cannot be undone.
        "
        confirmText="Delete"
        danger={true}
        loading={loading}
        onClose={() => {
          if (!loading) {
            setOpen(false);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
