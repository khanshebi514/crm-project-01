"use client";

export default function ProductExportButton() {
  async function handleExport() {
    window.location.href = "/api/products/export";
  }

  return (
    <button
      onClick={handleExport}
      className="
      rounded-md
      bg-primary
      px-4
      py-2
      text-sm
      text-primary-foreground
      "
    >
      Export Products
    </button>
  );
}
