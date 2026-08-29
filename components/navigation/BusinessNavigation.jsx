"use client";

import { usePathname } from "next/navigation";

export default function BusinessNavigation() {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },

    {
      label: "Products",
      href: "/dashboard/products",
    },

    {
      label: "Sales",
      href: "/dashboard/sales",
    },

    {
      label: "Customers",
      href: "/dashboard/customers",
    },

    {
      label: "Inventory",
      href: "/dashboard/inventory",
    },

    {
      label: "Reports",
      href: "/dashboard/reports",
    },
  ];

  return (
    <nav className="space-y-1">
      {links.map((item) => {
        const active = pathname === item.href;

        return (
          <a
            key={item.href}
            href={item.href}
            className={`
              block
              rounded-md
              px-4
              py-2
              text-sm
              font-medium
              transition

              ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-text-secondary hover:bg-surface-muted hover:text-primary"
              }

            `}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
