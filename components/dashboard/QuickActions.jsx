"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Quick Sale",
      description: "Create a sale instantly",
      action: () => router.push("/dashboard/sales/new"),
    },

    {
      title: "Receive Payment",
      description: "Update customer balance",
    },

    {
      title: "Add Customer",
      description: "Save customer details",
    },

    {
      title: "Add Product",
      description: "Add a new item",
    },
  ];

  return (
    <section className="mt-8">
      <div className="sai-card">
        <h3 className="sai-section-title">Quick Actions</h3>

        <div
          className="
            mt-4
            grid
            gap-4
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {actions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={action.action}
              className="
                rounded-lg
                border
                border-border
                bg-surface-secondary
                p-4
                text-left
                transition
                hover:border-primary
                hover:bg-surface
              "
            >
              <p
                className="
                  font-semibold
                  text-text-primary
                "
              >
                {action.title}
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-text-secondary
                "
              >
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
