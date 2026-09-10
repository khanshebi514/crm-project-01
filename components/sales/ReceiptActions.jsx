"use client";

import { useRouter } from "next/navigation";

export default function ReceiptActions() {
  const router = useRouter();

  function handlePrint() {
    window.print();
  }

  return (
    <div
      className="
        mt-6
        flex
        flex-wrap
        justify-center
        gap-3
        print:hidden
      "
    >
      <button
        type="button"
        onClick={handlePrint}
        className="
          rounded-md
          bg-primary
          px-4
          py-2
          text-sm
          font-medium
          text-primary-foreground
          hover:bg-primary-hover
        "
      >
        Print Receipt
      </button>

      <button
        type="button"
        onClick={() => router.push("/dashboard/sales/new")}
        className="
          rounded-md
          border
          border-border
          px-4
          py-2
          text-sm
          font-medium
          text-text-primary
        "
      >
        New Sale
      </button>

      <button
        type="button"
        onClick={() => router.push("/dashboard/sales")}
        className="
          rounded-md
          border
          border-border
          px-4
          py-2
          text-sm
          font-medium
          text-text-primary
        "
      >
        Back to Sales
      </button>
    </div>
  );
}
