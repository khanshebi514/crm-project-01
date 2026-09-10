import { redirect } from "next/navigation";

import { getSessionCookie } from "@/lib/auth/cookies";
import { resolveSession } from "@/lib/auth/auth";

import { requireBusinessUser } from "@/lib/auth/route-access";

import AppHeader from "@/components/layout/AppHeader";
import Sidebar from "@/components/layout/Sidebar";
import BusinessNavigation from "@/components/navigation/BusinessNavigation";

import { resolveTenantContext } from "@/lib/tenancy/tenant-context";

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

  const session = await resolveSession(token);

  const tenantContext = await resolveTenantContext({
    authenticatedUserId: session.user.id,

    activeTenantId: session.activeTenantId,
  });

  const tenantName = tenantContext.tenant.name;

  return (
    <section className="min-h-screen bg-surface-secondary">
      <div className="flex">
        <Sidebar>
          <BusinessNavigation />
        </Sidebar>

        <div className="flex-1">
          <AppHeader
            title={tenantName}
            subtitle="Manage your business operations"
            navigation={<BusinessNavigation />}
          />

          <main className="sai-page">{children}</main>
        </div>
      </div>
    </section>
  );
}
