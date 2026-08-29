import { redirect } from "next/navigation";

import { getSessionCookie } from "@/lib/auth/cookies";

import { requireBusinessUser } from "@/lib/auth/route-access";

import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/Sidebar";
import BusinessNavigation from "@/components/navigation/BusinessNavigation";

export default async function DashboardLayout({ children }) {
  const token = await getSessionCookie();

  if (!token) {
    redirect("/login");
  }

  try {
    await requireBusinessUser(token);
  } catch {
    redirect("/login");
  }

  return (
    <section className="min-h-screen bg-surface-secondary">
      <div className="flex">
        <Sidebar>
          <BusinessNavigation />
        </Sidebar>

        <div className="flex-1">
          <AppHeader
            title="SAI Business Dashboard"
            subtitle="Manage your business operations"
            navigation={<BusinessNavigation />}
          />

          <main className="sai-page">{children}</main>
        </div>
      </div>
    </section>
  );
}
