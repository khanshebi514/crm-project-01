"use client";

import { useRouter } from "next/navigation";

export default function Sidebar({ children }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");

    router.refresh();
  }

  return (
    <aside
      className="
      hidden
      min-h-screen
      w-64
      border-r
      border-border
      bg-surface
      p-5
      md:flex
      md:flex-col
    "
    >
      <div>
        <div className="mb-8">
          <h2
            className="
            text-xl
            font-bold
            text-text-primary
          "
          >
            SAI
          </h2>

          <p
            className="
            text-sm
            text-text-secondary
          "
          >
            Business Platform
          </p>
        </div>

        {children}
      </div>

      <div className="mt-auto">
        <button
          onClick={logout}
          className="
            w-full
            rounded-md
            border
            border-border
            px-4
            py-2
            text-sm
            font-medium
            text-text-secondary
            hover:bg-surface-muted
            hover:text-danger
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
