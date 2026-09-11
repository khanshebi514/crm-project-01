"use client";

import { useRouter } from "next/navigation";

export default function CustomerCard({ customer }) {
  const router = useRouter();

  return (
    <div
      className="
      rounded-lg
      border
      border-border
      bg-surface
      p-5
      "
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{customer.name}</h3>

          <p className="text-sm text-text-secondary">
            {customer.phone || "No phone"}
          </p>
        </div>

        <button
          onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
          className="
          rounded-md
          bg-primary
          px-3
          py-1
          text-sm
          text-primary-foreground
          "
        >
          View
        </button>
      </div>
    </div>
  );
}
