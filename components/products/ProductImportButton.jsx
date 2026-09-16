"use client";

import { useState } from "react";

import { useToast } from "@/context/ToastProvider";

export default function ProductImportButton() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  async function handleImport(e) {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/products/import", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <label
      className="
      cursor-pointer
      rounded-md
      border
      px-4
      py-2
      text-sm
      "
    >
      {loading ? "Uploading..." : "Import Products"}

      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={handleImport}
        className="hidden"
      />
    </label>
  );
}
