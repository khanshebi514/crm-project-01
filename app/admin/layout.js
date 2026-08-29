import { redirect } from "next/navigation";

import { getSessionCookie } from "@/lib/auth/cookies";

import { requireAdmin } from "@/lib/auth/route-access";
import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/Sidebar";
import AdminNavigation from "@/components/navigation/AdminNavigation";

export default async function AdminLayout({ children }) {
  const token = await getSessionCookie();

  if (!token) {
    redirect("/login");
  }

  try {
    await requireAdmin(token);
  } catch {
    redirect("/dashboard");
  }

  return (
    <section className="min-h-screen bg-surface-secondary">
      <div className="flex">
        <Sidebar>
          <AdminNavigation />
        </Sidebar>

        <div className="flex-1">
          <AppHeader
            title="SAI Platform Admin"
            subtitle="Manage your SaaS ecosystem"
            navigation={<AdminNavigation />}
          />

          <main className="sai-page">{children}</main>
        </div>
      </div>
    </section>
  );
}
