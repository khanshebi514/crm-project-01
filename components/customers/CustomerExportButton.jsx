"use client";

export default function CustomerExportButton() {
  function handleExport() {
    window.location.href = "/api/customers/export";
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
      Export Customers
    </button>
  );
}
