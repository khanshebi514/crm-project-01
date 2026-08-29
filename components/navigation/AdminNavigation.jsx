"use client";

import { usePathname } from "next/navigation";

export default function AdminNavigation() {
  const pathname = usePathname();

  const links = [
    {
      label: "Overview",
      href: "/admin",
    },

    {
      label: "Users",
      href: "/admin/users",
    },

    {
      label: "Tenants",
      href: "/admin/tenants",
    },

    {
      label: "Plans",
      href: "/admin/plans",
    },

    {
      label: "Subscriptions",
      href: "/admin/subscriptions",
    },

    {
      label: "Audit Logs",
      href: "/admin/audit",
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
